export function estimateReadingTime(
  text: string | any
): number {

  if (!text) {
    return 1;
  }


  let content = "";



  // If text is already a string

  if (typeof text === "string") {

    content = text;

  }



  // If old article format

  else if (Array.isArray(text)) {


    content = text
      .map((item:any)=>{


        if(typeof item === "string"){

          return item;

        }



        if(
          item.paragraphs &&
          Array.isArray(item.paragraphs)
        ){

          return item.paragraphs.join(" ");

        }


        return "";

      })
      .join(" ");


  }



  const words =
    content
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;



  return Math.max(
    1,
    Math.ceil(words / 200)
  );

}