export const getIsAdmin = () => {
       const role = (localStorage.getItem("role") || "").toLowerCase().trim();
       const signed =
         !!localStorage.getItem("jazzmyomyo_sign_in") ||
         !!sessionStorage.getItem("jazzmyomyo_sign_in");
       return role === "admin" && signed;
    };