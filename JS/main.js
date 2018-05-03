    let template = document.querySelector("#otherTemp").content;
    let otherStuff = document.querySelector("#other");
    let page = 1;
    let lookingForData = false;

   function fetchOther() {
        lookingForData = true;

        let urlParams = new URLSearchParams(window.location.search);

        let catid = urlParams.get("category");
    //    let parentid = urlParams.get("parent");
        if(!catid){
            catid=6;
        }
       console.log(catid);

        fetch("http://mihaelsandro.com/wordpress/wp-json/wp/v2/huset?_embed&per_page=2&page=" + page + "&categories=" + catid)
            .then(e => e.json())
            .then(showOther)
    }

    function showOther(data) {
        console.log(data);
        data.forEach(showOneOther);
        lookingForData = false;
    }

    function showOneOther(anEvent) {
        console.log(anEvent._embeded)
        let clone = template.cloneNode(true);
        clone.querySelector("h1").textContent = anEvent.title.rendered;
        clone.querySelector(".price span").textContent = anEvent.acf.price;
        clone.querySelector(".time").textContent = anEvent.acf.time;
        var year = anEvent.acf.date.substring(2, 4);
        var month = anEvent.acf.date.substring(4, 6);
        var day = anEvent.acf.date.substring(6, 8);
        clone.querySelector(".date").textContent = day + "/" + month + "/" + year;
        //clone.querySelector(".description").innerHTML = anEvent.acf.description;
        clone.querySelector(".genre").textContent = anEvent.acf.genre;
        if (anEvent._embedded["wp:featuredmedia"]) { //img is there
            clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
        }
        else { // no img
            clone.querySelector("img").remove()
        }
        clone.querySelector("a.readmore").href = "subpage.html?id=" + anEvent.id;
        other.appendChild(clone);
    }
    fetchOther();
    setInterval(function () {
        if (bottomVisible() && lookingForData === false) {
            page++;
            fetchOther();
        }
    }, 100)
function onReady(callback) {
        let intervalID = window.setInterval(checkReady, 1000);

        function checkReady() {
            if (document.getElementsByTagName('body')[0] !== undefined) {
                window.clearInterval(intervalID);
                callback.call(this);
            }
        }
    }

 var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("huset_svg").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
    function bottomVisible() {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + scrollY >= pageHeight
        return bottomOfPage || pageHeight < visible
    }



