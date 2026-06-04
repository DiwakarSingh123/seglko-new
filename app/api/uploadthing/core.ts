import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  resumeUploader: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(() => ({}))
    .onUploadComplete(({ file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
