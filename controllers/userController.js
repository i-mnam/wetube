export const join = (req, res) => res.render("join");
export const login = (req, res) => res.render("login");
export const logout = (req, res) => res.render("logout");

export const users = (req, res) => res.render("users");
export const editProfile = (req, res) =>  res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");
export const userDetail = (req, res) => {
    console.log("왜자꾸 나오다 안나오다 하지.. 캐시인가!!");
    res.render("userDetail");
}