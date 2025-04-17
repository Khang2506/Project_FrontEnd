<template>
    <div class="container-fluid">
        <!-- Header -->
        <div class="row">
            <div class="col-12 d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
                <!-- Logo và tiêu đề -->
                <div class="d-flex align-items-center">
                    <img src="../assets/Logo_New (1).png" alt="Logo" class="me-2"
                        style="height: 40px; width: 40px; border-radius: 50%;" />
                    <h4 class="mb-0">Đăng nhập</h4>
                </div>
                <!-- Liên kết hỗ trợ -->
                <a href="#" class="text-danger">Bạn cần giúp đỡ?</a>
            </div>
        </div>

        <!-- Nội dung chính -->
        <div class="row vh-100 bg-newColor">
            <div class="col-12 col-md-7 d-flex flex-column justify-content-center align-items-center text-white">
                <!-- Logo hiển thị theo dạng tròn -->
                <img src="../assets/Logo_New__2_-removebg-preview.png" alt="Logo" class="logo" />
            </div>

            <!-- Form đăng nhập -->
            <div class="col-12 col-md-5 d-flex align-items-center justify-content-center">
                <div class="border rounded p-4 shadow bg-light" style="width: 100%; max-width: 400px;">
                    <h5 class="mb-3">Đăng nhập</h5>

                    <!-- Input email -->
                    <div class="form-floating-input mb-3">
                        <i class="bi bi-envelope"></i>
                        <input type="email" class="form-control" placeholder=" " v-model="email" id="email" />
                        <label for="email">Email</label>
                        <div v-if="emailError" class="text-danger small">{{ emailError }}</div>
                    </div>

                    <!-- Input mật khẩu -->
                    <div class="form-floating-input mb-3">
                        <i class="bi bi-lock"></i>
                        <input type="password" class="form-control" placeholder=" " v-model="password" id="password" />
                        <label for="password">Mật khẩu</label>
                        <div v-if="passwordError" class="text-danger small">{{ passwordError }}</div>
                    </div>

                    <!-- Nút đăng nhập -->
                    <button class="btn bg-newColorbtn w-100 mb-3" :disabled="!email || !password" @click="handleLogin">
                        Đăng nhập
                    </button>

                    <!-- Divider -->
                    <div class="d-flex align-items-center my-3">
                        <hr class="flex-grow-1" />
                        <span class="mx-2 text-muted">HOẶC</span>
                        <hr class="flex-grow-1" />
                    </div>

                    <!-- Đăng nhập bằng Google -->
                    <div class="d-flex flex-column gap-2">
                        <button class="btn btn-outline-primary">
                            <i class="bi bi-qr-code"></i> QR Code
                        </button>
                        <button class="btn btn-outline-danger">
                            <i class="bi bi-google me-2"></i> Google
                        </button>
                    </div>

                    <!-- Chuyển sang trang đăng ký -->
                    <div class="text-center mt-3">
                        <small>Chưa có tài khoản? <router-link to="/" class="text-danger">Đăng ký</router-link></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-newColor {
    background-color: #e4d5b4;
}

.bg-newColorbtn {
    background-color: #e0c17f;
    color: black;
    text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    font-weight: 600;
    padding: 0.75rem 1.25rem;
    /* Adjusted to rem */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.bg-newColorbtn:hover {
    background-color: #c9a95a;
    transform: translateY(-2px);
}

button.btn-outline-primary,
button.btn-outline-danger {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    padding: 0.625rem;
    /* Adjusted to rem */
    font-size: 1rem;
    /* Adjusted to rem */
}

button.btn-outline-primary i,
button.btn-outline-danger i {
    font-size: 1.125rem;
    /* Adjusted to rem */
    margin-right: 0.5rem;
    /* Adjusted to rem */
}

.form-floating-input {
    position: relative;
    display: flex;
    align-items: center;
}

.form-floating-input i {
    position: absolute;
    left: 10px;
    font-size: 1.125rem;
    /* Adjusted to rem */
    color: #888;
    z-index: 2;
}

.form-floating-input input.form-control {
    padding-left: 36px;
    border-radius: 6px;
    padding-top: 14px;
    padding-bottom: 6px;
    font-size: 1rem;
    /* Adjusted to rem */
    border: 1px solid #ccc;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
}

.form-floating-input input.form-control:focus {
    border-color: #e0c17f;
    box-shadow: 0 0 0 3px rgba(224, 193, 127, 0.3);
    outline: none;
    background-color: #fffef9;
}

.form-floating-input label {
    position: absolute;
    top: 50%;
    left: 36px;
    transform: translateY(-50%);
    font-size: 0.875rem;
    /* Adjusted to rem */
    color: #aaa;
    transition: all 0.2s ease;
    pointer-events: none;
    background-color: white;
    padding: 0 4px;
}

.form-floating-input input:focus+label,
.form-floating-input input:not(:placeholder-shown)+label {
    top: 2px;
    font-size: 0.75rem;
    /* Adjusted to rem */
    color: #e0c17f;
}

.text-center small {
    font-size: 0.875rem;
    /* Adjusted to rem */
}

.text-danger {
    text-decoration: none;
    color: #f44336;
}

.text-danger:hover {
    color: #d32f2f;
}

@media (max-width: 768px) {
    .bg-newColorbtn {
        font-size: 0.875rem;
        /* Adjusted for smaller screens */
        padding: 0.625rem;
        /* Adjusted for smaller screens */
    }
}

a {
    text-decoration: none;
}

.router-link-exact-active,
.router-link-active {
    text-decoration: none;
}

.logo {
    max-width: 100%;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
}

.logo:hover {
    transform: scale(1.1);
    transition: transform 1s ease;
}
</style>
<script>
export default {
    name: "LoginPage",
    data() {
        return {
            email: "",
            password: "",
            emailError: "", // Lỗi email
            passwordError: "", // Lỗi mật khẩu
        };
    },
    methods: {
        handleLogin() {
            // Tài khoản giả lập
            const validEmail = "user@example.com";
            const validPassword = "123456";

            // Xóa lỗi cũ khi kiểm tra đăng nhập
            this.emailError = "";
            this.passwordError = "";

            // Kiểm tra email
            if (!this.email) {
                this.emailError = "Email không được bỏ trống.";
            } else if (this.email !== validEmail) {
                this.emailError = "Tài khoản không tồn tại.";
            }

            // Kiểm tra mật khẩu
            if (!this.password) {
                this.passwordError = "Mật khẩu không được bỏ trống.";
            } else if (this.password !== validPassword) {
                this.passwordError = "Mật khẩu không đúng.";
            }

            // Nếu không có lỗi, chuyển hướng đến trang chủ
            if (!this.emailError && !this.passwordError) {
                this.$router.push("/home"); // Chuyển hướng sau khi đăng nhập thành công
            }
        },
    },
};
</script>