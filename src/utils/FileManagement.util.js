import fs from "fs/promises";
import path from "path";

export const deleteImageFiles = async (filenames, folder = "products") => {
  for (const filename of filenames) {
    const imagePath = path.join(process.cwd(), "uploads", folder, filename);

    try {
      await fs.unlink(imagePath);
    } catch (error) {
      console.warn("Failed to delete image: ", imagePath);
    }
  }
};

/**
 * Adds or removes a product ID from a file asynchronously.
 *
 * @param {string} productId - The product ID to add or remove.
 * @param {"add" | "delete"} status - Whether to add or delete the ID.
 */
export async function logProductId(productId, status) {
  if (status !== "add" && status !== "delete") {
    throw new Error(`Invalid status "${status}". Must be "add" or "delete".`);
  }

  try {
    const filePath = path.join(process.cwd(), "product_ids.txt");

    // Ensure file exists
    try {
      await fs.access(filePath); // just check if it exists
    } catch {
      await fs.writeFile(filePath, ""); // create if it doesn't exist
    }

    const fileContent = await fs.readFile(filePath, "utf-8");
    const ids = fileContent.split("\n").filter((id) => id.trim() !== "");

    if (status === "add") {
      if (!ids.includes(productId)) {
        ids.push(productId);
        await fs.writeFile(filePath, ids.join("\n"));
        console.log(`✅ Added ID: ${productId}`);
      } else {
        console.log(`⚠️ ID already exists: ${productId}`);
      }
    } else {
      const updatedIds = ids.filter((id) => id !== productId);
      await fs.writeFile(filePath, updatedIds.join("\n"));
      console.log(`❌ Removed ID: ${productId}`);
    }
  } catch (err) {
    console.error("❌ Error updating product IDs:", err);
    throw err;
  }
}
