export const join = (req, res) => res.send("Join");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");

export const users = (req, res) => {
    console.log("??? users???");
    return res.send("users");
}

export const editProfile = (req, res) => {
    console.log("edit - profile");
    return res.send("editProfile");
}
export const changePassword = (req, res) => res.send("changePassword");

export const userDetail = (req, res) => {
    console.log("whats wrong");
    return res.send("userDetail");
}