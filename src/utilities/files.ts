import { handleErrorMessage } from "./error-handling";
import { toFixed } from "./to-fixed";

const fileTypes = {
  jpg: "image/jpg",
  jpeg: "image/jpeg",
  png: "image/png",
  pdf: "application/pdf"
};

export const getBase64 = (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = function () {
        resolve(reader.result as string);
      };

      reader.onerror = function (error) {
        reject(error);
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const extractFileData = (url: string) => {
  if (!url || typeof url !== "string") {
    return { name: "", type: "" as keyof typeof fileTypes };
  }

  const [name, type] = url.split("/")[url.split("/").length - 1].split(".");

  return { name, type: type as keyof typeof fileTypes };
};

export const convertUrlToFile = async (
  url: string,
  fileData?: { name: string; type: keyof typeof fileTypes }
) => {
  try {
    if (!url) {
      return null;
    }

    const { name, type } = fileData || extractFileData(url);

    const response = await fetch(url);

    const blob = await response.blob();

    return new File([blob], name, { type: fileTypes[type] });
  } catch (error) {
    handleErrorMessage(error);
  }
};

export const convertToKB = (size = 0) => {
  if (!size || isNaN(size)) {
    return "";
  }

  const fileSize = toFixed(size / 1024);

  if (fileSize < 1024) {
    return `${fileSize}KB`;
  }

  return `${toFixed(fileSize / 1024)}MB`;
};

export const downloadFile = (file?: File | null) => {
  try {
    if (!file) {
      return;
    }

    const fileURL = URL.createObjectURL(file);

    const link = document.createElement("a");

    link.href = fileURL;

    link.download = file.name; // File name

    link.click();

    // Clean up the object URL after download
    URL.revokeObjectURL(fileURL);
  } catch (error) {
    handleErrorMessage(error);
  }
};

export const generateThumbnail = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const video = document.createElement("video");

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return reject("Canvas context not supported.");
    }

    video.src = URL.createObjectURL(file);

    video.currentTime = Math.floor(Math.random() * 10) + 1;

    video.crossOrigin = "anonymous"; // In case it's needed for security

    video.onloadeddata = () => {
      canvas.width = video.videoWidth;

      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/jpeg");

      return resolve(dataUrl);
    };

    video.onerror = () => {
      return reject("Error loading video file.");
    };
  });
};

export function removeFileExtension(filePath: string): string {
  if (!filePath) return "";

  // Find the last dot to extract the file extension
  const lastDotIndex = filePath.lastIndexOf(".");

  const lastSlashIndex = Math.max(
    filePath.lastIndexOf("/"),
    filePath.lastIndexOf("\\")
  );

  // If no dot is found or it's part of the directory name, return the original path
  if (lastDotIndex === -1 || lastDotIndex < lastSlashIndex) return filePath;

  // Extract the filename without extension
  return filePath.substring(0, lastDotIndex);
}

export function extractFolderName(relativePath?: string): string {
  if (!relativePath) return "";

  // Normalize path for cross-platform compatibility
  const normalizedPath = relativePath.replace(/\\/g, "/");

  // Remove trailing slash if present
  const trimmedPath = normalizedPath.replace(/\/$/, "");

  // Find the last slash to determine the folder name
  const lastSlashIndex = trimmedPath.lastIndexOf("/");

  // If no slash is found, there's no folder in the path
  if (lastSlashIndex === -1) return "";

  // Extract the folder name
  const secondLastSlashIndex = trimmedPath.lastIndexOf("/", lastSlashIndex - 1);
  return trimmedPath.substring(secondLastSlashIndex + 1, lastSlashIndex);
}

export const chunkArray = (array: File[], size: number): File[][] => {
  const chunks: File[][] = [];

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
};
