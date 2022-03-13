const isLogined = () => !!localStorage.getItem("Authorization");
export default isLogined;
