var services = new Services();
var validation = new Validation();

function getListUser() {
    services
        .fetchData()
        .then(function (result) {
            renderHTML(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
getListUser();

function renderHTML(data) {
    var content = "";
    data.forEach(function (data, index) {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${data.account}</td>
            <td>${data.password}</td>
            <td>${data.fullName}</td>
            <td>${data.email}</td>
            <td>${data.language}</td>
            <td>${data.userType}</td>
            <td>${data.description}</td>
            <td>
                <img width="60px" src="../../assets/img/${data.avatar}">
            <td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="sua(${data.id
            })">Sửa</button>
                <button class="btn btn-danger" onclick="xoa(${data.id
            })">Xoá</button>
            </td>
         
        </tr>
    `
    });
    document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}
/**
 * Xoá
 */
function xoa(id) {
    services
        .deleteUser(id)
        .then(function (result) {
            // Xoá thành công = fetch lại data mới
            getListUser();
        })
        .catch(function (error) {
            console.log(error);
        });
}
/**
 * Thêm mới
 */
getEle("btnThemNguoiDung").addEventListener("click", function () {
    // // Xoá toàn bộ dữ liệu trên form trước khi thêm mới
    // getEle("TaiKhoan").disabled = false;
    // getEle("formNguoiDung").reset();
    // Sửa lại tiêu đề modal
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm người dùng";
    // add vô button Thêm dưới footer của modal
    var footer = `<button class="btn btn-success" onclick="them(true)">Thêm</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

function them(isAdd) {
    //DOM tới các thẻ input lấy value
    var account = getEle("TaiKhoan").value;
    var fullName = getEle("HoTen").value;
    var password = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var avatar = getEle("HinhAnh").value;
    var userTyper = getEle("loaiNguoiDung").value;
    var language = getEle("loaiNgonNgu").value;
    var description = getEle("MoTa").value;

    var isValid = true;
    if (isAdd) {
        //taiKhoan
        isValid &= validation.kiemTraRong(
            account,
            "tbTK",
            "Vui lòng không để trống!"
        )
            && validation.kiemTraTaiKhoanTonTai(
                account,
                "tbTK",
                "Tài khoản đã tồn tại ! Vui lòng nhập tài khoản mới !"
            );
        //hoTen
        isValid &= validation.kiemTraRong(
            fullName,
            "tbHoten",
            "Vui lòng không để trống!"
        ) && validation.kiemTraKiTuChuoi(
            fullName,
            "tbHoten",
            "Vui lòng không nhập số và kí tự đặc biệt !"
        );
        //matKhau
        isValid &= validation.kiemTraRong(
            password,
            "tbMatKhau",
            "Vui lòng không để trống!"
        )
            && validation.kiemTraMatKhau(
                password,
                "tbMatKhau",
                "có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8"
            )
        //email
        isValid &= validation.kiemTraRong(
            email,
            "tbEmail",
            "Vui lòng không để trống!"
        )
            && validation.kiemTraEmail(
                email,
                "tbEmail",
                "Vui lòng nhập đúng kiểu định dạng email!Vd: email@gmail.com"
            );
        //ngonNgu
        isValid &= validation.kiemTraLoaiNguoiDung(
            "loaiNgonNgu",
            "tbLoaiNgonNgu",
            "Vui lòng chọn ngôn ngữ !"
        )
        //nguoiDung
        isValid &= validation.kiemTraLoaiNguoiDung(
            "loaiNguoiDung",
            "tbLoaiNd",
            "Vui lòng chọn loại người dùng !"
        )
        //moTa
        isValid &= validation.kiemTraRong(
            description,
            "tbMoTa",
            "Vui lòng không để trống!"
        )
            && validation.kiemTraDoDaiKiTu(
                description,
                "tbMoTa",
                "Vui lòng nhập không quá 60 ký tự !",
                1,
                60
            );;
        //hinhAnh
        isValid &= validation.kiemTraRong(
            avatar,
            "tbHinhAnh",
            "Vui lòng không để trống!"
        );
    }
    if (!isValid) return null;
    var user = new User("", account, fullName, password, email, avatar, userTyper, language, description);
    // Gọi tới phương thức service
    services
        .addUser(user)
        .then(function () {
            // Thêm thành công = fetch lại data mới
            getListUser();
            // Tắt modal
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        });

}
    /**
     * Sửa
     */
    function sua(id) {
        // Sửa lại tiêu đề modal
        document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa người dùng";
        // add vô button Cập Nhật dưới footer của modal
        var footer = `<button class="btn btn-warning" onclick="capNhat(${id})">Cập Nhật</button>`;
        document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
        // gọi tới phương thức services để lấy product từ server
        services
            .getUserById(id)
            .then(function (result) {
                var user = result.data;
                //dom tới các thẻ input lấy value
                getEle("TaiKhoan").value = user.account;
                getEle("TaiKhoan").disabled = true;
                getEle("HoTen").value = user.fullName;
                getEle("MatKhau").value = user.password;
                getEle("Email").value = user.email;
                getEle("HinhAnh").value = user.avatar;
                getEle("loaiNguoiDung") = user.userTyper;
                getEle("loaiNgonNgu") = user.language;
                getEle("MoTa").value = user.description;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /**
     * Cập nhật
     */
    function capNhat(id) {
        //DOM tới các thẻ input lấy value
        var account = getEle("TaiKhoan").value;
        var fullName = getEle("HoTen").value;
        var password = getEle("MatKhau").value;
        var email = getEle("Email").value;
        var avatar = getEle("HinhAnh").value;
        var userTyper = getEle("LoaiNguoiDung").value;
        var language = getEle("LoaiNgonNgu").value;
        var description = getEle("MoTa").value;
        //Tạo đối tượng product từ lớp đối tượng Product
        var user = new User("", account, fullName, password, email, avatar, userTyper, language, description);
        // gọi tới phương thức services để lấy product từ server
        services
            .updateUser(id, user)
            .then(function () {
                // Cập nhật thành công = fetch lại data mới
                getListUser();
                // Xoá dữ liệu trên form sau khi cập nhật thành công
                getEle("TaiKhoan").disabled = false;
                getEle("formNguoiDung").reset();
                // Tắt modal
                document.getElementsByClassName("close")[0].click();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getEle(id) {
        return document.getElementById(id);
    }