const addUserBtn=document.getElementById('addUser');
const addUserbtn=addUserBtn.innerText;
const userNameTextField = document.getElementsByClassName('form-control')[0]; // Assuming it's the first element with this class
const recordsDisplay=document.getElementById("records");
let userArray=[];
let edit_id=null;


let objstr=localStorage.getItem("users");
if(objstr!=null){
  userArray=  JSON.parse(objstr);
}

DisplayInfo();


addUserBtn.onclick=()=>{
    const name =userNameTextField.value;
    if(edit_id!=null){
       userArray.splice(edit_id,1,{'name':name}) 
       edit_id=null;
    }else{ 
        userArray.push({'name':name});
    }
SaveInfo(userArray);
userNameTextField.value='';

addUserBtn.innerText=addUserbtn;
}

function SaveInfo(userArray){
    let str = JSON.stringify(userArray);
    localStorage.setItem('users',str);
    DisplayInfo();
}
function DisplayInfo() {
    let statement='';
userArray.forEach((user,i)=>{
    statement+=` <tr>
    <th scope="row">${i+1}</th>
    <td>${user.name}</td>
    <td><i class="btn text-white fa fa-edit btn-info mx-3" onClick=' EditInfo(${i})'></i><i class='fa fa-trash'onClick="DeleteInfo(${i})"></i>
    </td>
</tr>`;
recordsDisplay.innerHTML=statement;

})
}
function EditInfo(id){
edit_id=id;
userNameTextField.value=userArray[id].name;
addUserBtn.innerText='Save Changes';

}
function DeleteInfo(id){
  userArray.splice(id,1); 
  SaveInfo(userArray);

}

