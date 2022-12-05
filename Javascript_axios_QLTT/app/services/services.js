function Services() {
    this.fetchData = function() {
        return axios({
            url: "https://638c6687eafd555746a597ec.mockapi.io/api/TeachMember",
            method: "GET",
        });
        
    };
    this.deleteUser = function(id) {
        return axios({
            url: `https://638c6687eafd555746a597ec.mockapi.io/api/TeachMember/${id}`,
            method: "DELETE",
        });
    };
    this.addUser = function(user) {
        return axios({
            url: "https://638c6687eafd555746a597ec.mockapi.io/api/TeachMember",
            method: "POST",
            data: user,
        });
    };
    this.getUserById = function(id) {
        return axios({
            url: `https://638c6687eafd555746a597ec.mockapi.io/api/TeachMember/${id}`,
            method: "GET",
        })
    }
    this.updateUser = function(id, user) {
        return axios({
            url: `https://638c6687eafd555746a597ec.mockapi.io/api/TeachMember/${id}`,
            method: "PUT",
            data: user,
        })
    }
}