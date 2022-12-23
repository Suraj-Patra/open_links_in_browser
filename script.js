const fs = require('fs');
const child_process = require('child_process');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

let [ browser ] = process.argv.slice(2);

const gettingInputs = () => {
    readline.question('a. File\nb.Links\nEnter option : ', option => {

        let path = '';
        if(option === 'a'){
            readline.question('Enter file name : ', file => {
                path = `./Files/${file}`;
                readline.close();
                openFile(path);
            })
        } else {
            path = './links.txt';
            openFile(path);
        }
    })

}


const openFile = (path) => {
     console.log(path);
     fs.readFile(path, (err, data) => {
         data = data.toString();
         dataArr = data.split('\n');

         linkArr = dataArr.filter((data) => {
             if(data !== ''){
                 return data;
             }
         })

         console.log(linkArr);

        openLinks(linkArr);
     })
}

const openLinks = (links) =>  {

    let command = '';
    if(browser === 'chrome'){
        command = `google-chrome`;
    } else if(browser === 'librewolf'){
        let path = 'flatpak run io.gitlab.librewolf-community';
        command = `${path} --private`;
    }


    for(let link of links) {

        if(!link) {
            console.log(`No a valid url : ${link}`);
        }else {
            let fullCommand = '';
            fullCommand = command + ` ${link}`;
            console.log(fullCommand);
            child_process.exec(fullCommand);
        }
    }

}

gettingInputs();



/*

*** NOTE : Only for Linux ***

Process :

    Command :

        a. node script.js chrome    |--> For chrome
        b. node script.js librewolf |--> For librewolf in private window

        Type : a- for file option, b- for links option


    From links :
    1. Install Node
    2. Create a directory --> save this file as 'script.js' inside it
    3. Create another file inside the directory called --> 'links.txt'
    4. Copy the links you want to open, in the 'links.txt'
    5. Give following command :
    

    From file :
    1. same
    2. same
    3. create another directory called 'Files'
    4. Inside this directory copy the files with links you want to open.
    5. In the file name give the name of the file.
*/


/*

Resources :

    1. How to open chrome with node :
        https://stackoverflow.com/questions/8085474/can-node-js-invoke-chrome

    2. How to open a link with chrome :
        https://askubuntu.com/questions/963890/how-can-i-launch-google-chrome-through-terminal-and-get-the-terminal-back-for-ot

    3. How to open a link with librewolf :
        https://www.reddit.com/r/LibreWolf/comments/z8es7x/how_to_start_from_terminal/

        We have set an 'alias' in '~/bashrc' for librewolf command, that's why we are using the shortcut here.

*/




























