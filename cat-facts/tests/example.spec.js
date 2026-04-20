// @ts-check
import { test, expect } from "@playwright/test";

const IMAGE_URL_PREFIX = "https://cataas.com/";
const LOCALHOST_URL = "http://localhost:5173/";

test("app shows random fact and image", async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const fact = page.getByRole("paragraph");
  const image = page.getByRole("img");

  const factContent = await fact.textContent();

  // wait until the image has a valid src attribute.
  await expect(image).toHaveAttribute("src", /https:\/\/cataas\.com\//);
  const imageSrc = await image.getAttribute("src");

  expect(factContent?.length).toBeGreaterThan(0);
  expect(imageSrc).not.toBeNull();
  expect(imageSrc?.startsWith(IMAGE_URL_PREFIX)).toBeTruthy();
});

test("get new fact button", async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const oldFactContent = await page.locator("p").textContent();
  const oldImageSrc = await page.locator("img").getAttribute("src");

  await page.getByRole("button").click();

  // Wait until fact changes
  await expect
    .poll(async () => {
      return await page.locator("p").textContent();
    })
    .not.toEqual(oldFactContent);

  // Wait until image changes
  await expect
    .poll(async () => {
      return await page.locator("img").getAttribute("src");
    })
    .not.toEqual(oldImageSrc);

  const newFactContent = await page.locator("p").textContent();
  const newImageSrc = await page.locator("img").getAttribute("src");

  expect(newFactContent?.length).toBeGreaterThan(0);
  expect(newImageSrc).toMatch(/^https:\/\/cataas\.com/);
});
