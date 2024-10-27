


    
    export default async function uploadFile(data: any){

      // const { data: session } = useSession(); 
        
        try{
            //Extract the uploaded image
            const image =data[0];
            //create an instance of formdata
            const formData = new FormData();
            //append the image to the formdata
            formData.append('file',image);
            //bind the upload preset recruitment(cloudinary) to the formdata
            formData.append("upload_preset",
            "recruitment")
            //Make an Api request to the_hit_times cloudinary upload endpoint
            const uploadResponse = await fetch(
                "https://api.cloudinary.com/v1_1/dvw5qhccb/image/upload",
                {
                  method: "POST",
                  body: formData,
                }
            );
            const uploadedImageData= await uploadResponse.json();

            const imageUrl =uploadedImageData.secure_url;
            
            //print the url on console
            console.log(imageUrl);
            return imageUrl;
        }catch(e){
          console.log(e);
          
        }
    };
