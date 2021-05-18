import http from "../http-common";

class TransactionService {
    //Consume POST
    createUser() {
        return http.post("/user");
    }

    //Consume GET
    getAllUsers(data) {
        return http.get("/users", data);
    }
    getUser(id) {
        return http.get(`/user/${id}`);
    }

    //Consume DELETE
    deleteUser(id) {
        return http.delete(`/user/${id}`);
    }

    //Consume PUT
    updateUser(id, data) {
        return http.put(`/user/${id}`, data);
    }

    // findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    // }
}

export default new TransactionService();