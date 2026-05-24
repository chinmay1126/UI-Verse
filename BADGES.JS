function toggleCode(id){

  const block = document.getElementById(id);

  block.classList.toggle("show");
}

function copyCode(id){

  const text =
    document.getElementById(id).innerText;

  navigator.clipboard.writeText(text);

  const toast =
    document.getElementById("copyToast");

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  },2000);
}

/* SEARCH */

const searchInput =
  document.getElementById("searchInput");

searchInput.addEventListener("input",e=>{

  const value =
    e.target.value.toLowerCase();

  document
    .querySelectorAll(".badge-card")
    .forEach(card=>{

      const text =
        card.innerText.toLowerCase();

      card.style.display =
        text.includes(value)
        ? "block"
        : "none";

    });

});

const badgeSearchInput =document.getElementById("badgesSearch");
badgeSearchInput.addEventListener("input", function(){
  const filter =badgeSearchInput.value.toLowerCase();
  const cards =document.querySelectorAll(".badge-card");
  cards.forEach(card =>{
    const data=card.textContent.toLowerCase();
    if (data.includes(filter)){card.style.display ="";}
    else{card.style.display ="none";}
  });
});