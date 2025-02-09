export async function getid(){
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found!");
            return;
        }

        else{const userResponse = await fetch("http://127.0.0.1:8000/authy/getId/", {
            method: "GET",
            headers: { "Authorization": `Token ${token}` },
        });

        if (!userResponse.ok)
            { 
                throw new Error(`HTTP error! Status: ${userResponse.status}`);
    }

        else{
        const userData = await userResponse.json();
        console.log("User ID:", userData.userId);
        return userData.userId;
    }
    }


}
catch(err){
    console.log(err);
}
};