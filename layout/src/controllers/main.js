var teachListService = new TeachListService();

function getEl(id) {
    return document.getElementById(id);
}

function getListTeach() {

    var promise = teachListService.getListTeachServiceApi();
    getEl("loader").style.display = "block";
    promise
        .then(function (list) {

            getEl("loader").style.display = "none";
            renderHtml(list.data);

        })
        .catch(function (error) {
            getEl("loader").style.display = "none";
        })
};
getListTeach();

function renderHtml(teach) {

    var content = ""

    teach.forEach(function (teach) {
        if (teach.userType === "Teacher") {
            content += `
                <div class="col-lg-3 col-sm-6 col-12">
                    <div class="card member__card animate__animated animate__fadeIn">
                        <div class="member__img">
                            <img class="card-img-top" src="./image/${teach.avatar}" alt="" />
                        </div>
                        <div class="card-body text-center">
                            <h1 class="member__language">${teach.language}</h6>
                                <h1 class="card-title member__name">${teach.fullName}</h1>
                                <p class="card-text member__info">${teach.description}</p>
                        </div>
                    </div>
                </div>
        `
        }
    })
    console.log(content);
    getEl("memberList").innerHTML = content;
}