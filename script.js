let apikey = "645e86903d8ae3d528e97d524419a22ed644e7b0";

function randint(max){
    return Math.floor(Math.random() * max)
}

function gen(){
    let synonyms = {
        "go":["walk", "run"],
        "going":["walk", "run"],
        "killed":["skull "],
        "killing":["skull "],
        "kill":["skull "],
        "dead":["skull "],
        "death":["skull "],
        "die":["skull "],
        "love":["heart ", "heart_eyes"],
        "eat":["knife "],
        "ate":["knife "],
        "eating":["knife "],
        "grandma":["old_woman" ],
        "grandmother":["old_woman" ],
        "grandpa":["old_man" ],
        "grandfather":["old_man" ]
    }
    let txt = document.getElementById("txt");
    let disp = document.getElementById("display");
    if(txt.value == ""){
        disp.innerText = "No input found!";
    }else{
        let txtArr = txt.value.replace("!", "");
        txtArr = txtArr.replace("?", "");
        txtArr = txtArr.replace(".", "");
        txtArr = txtArr.split(" ");
        txtArr.map(txtInd => {
            let url = "";
            if(txtInd in synonyms){
                let arr = synonyms[txtInd];
                url = `https://emoji-api.com/emojis?search=${arr[randint(arr.length)]}&access_key=${apikey}`;
            }else{
                url = `https://emoji-api.com/emojis?search=${txtInd}&access_key=${apikey}`;
            }

            fetch(url, {
                method: "GET"
            })

            .then(response=>{
                if(!response.ok){
                    console.log('response not ok');
                }else{
                    return response.json();
                }
            })

            .then(data=>{
                if(data.message == "No results found"){
                    url = "https://emoji-api.com/emojis?access_key=645e86903d8ae3d528e97d524419a22ed644e7b0";
                    
                    fetch(url,{
                        method: "GET"
                    })

                    .then(response=>{
                        if(!response.ok){
                            console.log("response! NOT okay! >:(");
                        }else{
                            return response.json();
                        }
                    })

                    .then(data2=>{
                        let dataArr = data2[randint(data2.length)];
                        let txtIndex = txtArr.indexOf(txtInd)
                        txtArr[txtIndex] = txtInd + " " + dataArr.character + " ";
                        document.getElementById("display").innerText = txtArr.join(" ");
                    })
                }else{
                    let txtIndex = txtArr.indexOf(txtInd)
                    txtArr[txtIndex] =  txtInd + " " + data[randint(data.length)].character.toString();
                    document.getElementById("display").innerText = txtArr.join(" ");
                }
            })
        })
    }
}