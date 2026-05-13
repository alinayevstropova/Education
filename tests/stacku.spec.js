const { test, expect } = require("@playwright/test");

async function expectNoHorizontalOverflow(page) {
  const hasNoOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth <= window.innerWidth + 2;
  });
  expect(hasNoOverflow).toBeTruthy();
}

test.describe("StackU cinematic site", () => {
  test("homepage presents the premium product story", async ({ page }) => {
    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    await page.goto("/");

    await expect(page).toHaveTitle(/StackU Academy/);
    await expect(page.getByRole("heading", { name: /Learn money like the room depends on it/i })).toBeVisible();
    await expect(page.locator(".hero-bg")).toHaveAttribute("src", /cinematic-hero\.png/);
    await expect(page.getByRole("heading", { name: /One vertical scroll/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Built around decisions/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Apply for the next cohort/i })).toBeVisible();
    await expectNoHorizontalOverflow(page);
    expect(consoleErrors).toEqual([]);
  });

  test("track switcher updates the product copy", async ({ page }) => {
    await page.goto("/#studio");

    await page.getByRole("button", { name: "Founder" }).click();
    await expect(page.getByText("Turn financial chaos into operating rhythm.")).toBeVisible();
    await expect(page.getByText("Pricing and margin lab")).toBeVisible();

    await page.getByRole("button", { name: "Team" }).click();
    await expect(page.getByText("Give everyone the same financial language.")).toBeVisible();
    await expect(page.getByText("Company-specific case simulations")).toBeVisible();
  });

  test("director shot slider moves between course scenes", async ({ page }) => {
    await page.goto("/");

    await page.locator("[data-shot-slider]").scrollIntoViewIfNeeded();
    await expect(page.locator("[data-shot-index]")).toHaveText("01");
    await page.getByRole("button", { name: "Next scene" }).click();
    await expect(page.locator("[data-shot-index]")).toHaveText("02");
    await expect(page.getByRole("heading", { name: "Numbers become visible" })).toBeVisible();
    await page.getByRole("button", { name: "Previous" }).click();
    await expect(page.locator("[data-shot-index]")).toHaveText("01");
  });

  test("scroll-driven film reel advances through scenes", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(() => {
      const reel = document.querySelector("[data-cinema-reel]");
      window.scrollTo(0, reel.offsetTop);
    });
    await expect(page.getByText("Money OS opens the frame.")).toBeVisible();

    await page.evaluate(() => {
      const reel = document.querySelector("[data-cinema-reel]");
      window.scrollTo(0, reel.offsetTop + reel.offsetHeight * 0.82);
    });

    await expect(page.getByText("The plan gets defended.")).toBeVisible();
    await expect(page.locator("[data-reel-count]")).toContainText("04 / 04");
  });

  test("lead form validates and gives local success feedback", async ({ page }) => {
    await page.goto("/contact.html");

    await page.getByLabel("Name").fill("Alina");
    await page.getByLabel("Email").fill("alina@example.com");
    await page.getByLabel("Track").selectOption({ label: "Career accelerator" });
    await page.getByLabel("Context").fill("I want to understand investing and runway better.");
    await page.getByRole("button", { name: "Send application" }).click();

    await expect(page.getByText("Application draft received")).toBeVisible();
  });

  test("pricing toggles between billing modes", async ({ page }) => {
    await page.goto("/price.html");

    await expect(page.getByText("EUR 690")).toBeVisible();
    await page.getByRole("button", { name: "Annual" }).click();
    await expect(page.getByText("EUR 590/mo")).toBeVisible();
    await page.getByRole("button", { name: "Team" }).click();
    await expect(page.getByText("From EUR 4,900")).toBeVisible();
  });

  test("responsive navigation behaves correctly and keeps the layout contained", async ({ page, isMobile }) => {
    await page.goto("/");

    if (!isMobile) {
      await expect(page.getByRole("button", { name: "Open navigation" })).toBeHidden();
      await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
      await expectNoHorizontalOverflow(page);
      return;
    }

    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.locator(".mobileMenu")).toHaveClass(/mobile-menu-active/);
    await expect(page.getByRole("link", { name: "Apply now" })).toBeVisible();
    await page.getByRole("button", { name: "Close navigation" }).click();
    await expect(page.locator(".mobileMenu")).not.toHaveClass(/mobile-menu-active/);
    await expectNoHorizontalOverflow(page);
  });
});
