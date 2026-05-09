type NSFWPrediction = {
  className: string;
  probability: number;
};

let modelPromise: Promise<any> | null = null;

export const getNSFWModel = async () => {
  if (!modelPromise) {
    const tf = await import("@tensorflow/tfjs");
    tf.enableProdMode();

    modelPromise = (async () => {
      const nsfwjs = await import("nsfwjs");

      try {
        return await nsfwjs.load("indexeddb://nsfw-model");
      } catch {
        const model = await nsfwjs.load("MobileNetV2Mid");
        await model.model.save("indexeddb://nsfw-model");

        return model;
      }
    })();
  }

  return modelPromise;
};
export const checkNSFW = async (file: File): Promise<NSFWPrediction[]> => {
  const model = await getNSFWModel();

  const imageURL = URL.createObjectURL(file);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();

      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Failed to load image"));

      image.src = imageURL;
    });

    return await model.classify(img);
  } finally {
    URL.revokeObjectURL(imageURL);
  }
};

export const isNSFW = async (file: File): Promise<boolean> => {
  const predictions = await checkNSFW(file);
  const nsfwClasses = ["Porn", "Hentai", "Sexy"];
  return predictions.some(
    (prediction: NSFWPrediction) =>
      nsfwClasses.includes(prediction.className) &&
      prediction.probability >= 0.7,
  );
};
