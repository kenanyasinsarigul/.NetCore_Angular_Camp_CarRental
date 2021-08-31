export class GlobalConstants {
    
    public static apiUrl: string = "https://localhost:44383/api/";

    static Messages = class {
        public static loginError: string = "Hatalı kullanıcı adı veya şifre!";
        public static loginSuccess: string = "Giriş yapıldı!";
        public static registerSuccess: string = "Kayıt işlemi başarılı bir şekilde tamamlandı!";
        public static logoutSuccess: string = "Çıkış yapıldı!";

        public static welcomeMessage: string = "Hoş geldiniz";

        public static profileUpdateSuccess: string = "Hesap başarıyla güncellendi.";
        public static profileUpdateAftreLoginRequried: string = "Güvenlik ilkeleri nedeniyle tekrar giriş yapmanız gerekmekte!";
    }
}