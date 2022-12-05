function TeachListService() {
    
    this.getListTeachServiceApi = function () {
        
        var promise = axios({
            url: "https://638c6687eafd555746a597ec.mockapi.io/api/TeachMember",
            method: "GET",
        });
        
        return promise;
    }
}