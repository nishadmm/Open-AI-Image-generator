document?.querySelector("#image-form")?.addEventListener("submit", (e) => {
  e.preventDefault();

  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt")?.value;
  const size = document.querySelector("#size")?.value;

  if (prompt?.trim() === "") {
    alert("Please type something");
    return;
  }

  geneateImageRequest(prompt, size);
});

const showLoader = () => {
  document.querySelector(".spinner").classList.add("show");
};
const removeLoader = () => {
  document.querySelector(".spinner").classList.remove("show");
};

const geneateImageRequest = async (prompt, size) => {
  showLoader();
  try {
    const res = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!res.ok) {
      removeLoader();
      throw new Error("That image could not be generated");
    }

    const data = await res.json();
    const imageUrl = data?.data;
    document.querySelector("#image").src = imageUrl;

    removeLoader();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
};
