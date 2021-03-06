document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("teamlx JS imported successfully!");

    const editor = new EditorJS({
      minHeight: 50,
      holder: "editor",
      autofocus: true,
      placeholder:
        "Paste your content here: an image, your code from codepen, a youtube video, or just plain text!",
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"],
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        image: {
          class: SimpleImage,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          services: {
            youtube: true,
            codepen: true,
            twitter: true,
          },
        },
      },
    });

    document
      .getElementById("editorSend")
      .addEventListener("click", function () {
        editor
          .save()
          .then(function (data) {
            console.log(data);

            fetch("/posts/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify(data),
            });
          })
          .then(function () {
            editor.blocks.clear();
          })
          .then(function (){
            document.getElementById("success").classList.remove("hidden")
           });
      });
  },
  false
);
