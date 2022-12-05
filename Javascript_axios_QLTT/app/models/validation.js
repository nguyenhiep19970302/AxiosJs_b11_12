function Validation() {

    this.kiemTraRong = function (value, errorId, mess) {
        if (value === "") {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    };
    this.kiemTraKiTuChuoi = function (value, errorId, mess) {
        //a-z
        var letter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            //true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //error
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
    this.kiemTraEmail = function (value, errorId, mess) {
        var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(email)) {
            //true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //error
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
    this.kiemTraMatKhau = function (value, errorId, mess) {
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/.test(value)) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //error
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
    this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
        if (value.length >= min && value.length <= max) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //error
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
    this.kiemTraLoaiNguoiDung = function (selectId, errorId, mess) {
        if (getEle(selectId).selectedIndex !== 0) {
            //true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
    this.kiemTraTaiKhoanTonTai = function (value, errorId, mess) {
        if (value === services.getListProduct) {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    };
}