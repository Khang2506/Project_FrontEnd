<template>
    <div class="container-fluid">
        <!-- Header --> CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
        <div class="row">
            <div class="col-12 d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
                <div class="d-flex align-items-center">
                    <img src="../assets/Logo_New (1).png" alt="Logo" class="me-2"
                        style="height: 40px; width: 40px; border-radius: 50%;" />
                    <h4 class="mb-0">Đăng ký</h4>
                </div>
                <a href="#" class="text-danger">Bạn cần giúp đỡ?</a>
            </div>
        </div>

        <!-- Nội dung chính -->
        <div class="row vh-100 bg-newColor">
            <div class="col-12 col-sm-7 d-flex flex-column justify-content-center align-items-center text-white">
                <img src="../assets/Logo_New__2_-removebg-preview.png" alt="Logo" class="logo" />
            </div>

            <div class="col-12 col-sm-5 d-flex align-items-center justify-content-center">
                <div class="border rounded p-4 shadow bg-light" style="width: 100%; max-width: 400px;">
                    <h5 class="mb-3">Đăng ký</h5>

                    <div class="form-floating-input mb-3">
                        <i class="bi bi-envelope"></i>
                        <input type="email" class="form-control" placeholder=" " id="email" v-model="email" />
                        <label for="email">Email</label>
                    </div>

                    <button class="btn bg-newColorbtn w-100 mb-3" :disabled="!email" @click="handleNext">TIẾP
                        THEO</button>

                    <div class="d-flex align-items-center my-3">
                        <hr class="flex-grow-1" />
                        <span class="mx-2 text-muted">HOẶC</span>
                        <hr class="flex-grow-1" />
                    </div>

                    <div class="d-flex flex-column gap-2">
                        <button class="btn btn-outline-primary">
                            <i class="bi bi-qr-code"></i> QR Code
                        </button>
                        <button class="btn btn-outline-danger">
                            <i class="bi bi-google me-2"></i> Google
                        </button>
                    </div>

                    <small class="d-block text-muted mt-3 text-center">
                        Bằng việc đăng ký, bạn đã đồng ý với Zentras về
                        <a href="#">Điều khoản</a> & <a href="#">Chính sách bảo mật</a>.
                    </small>

                    <div class="text-center mt-3">
                        <small>Đã có tài khoản? <router-link to="/login" class="text-danger">Đăng
                                nhập</router-link></small>
                        <br>
                        <small>Đăng ký chủ cửa hàng?<router-link to="/register-store-owner" class="text-danger"> Đăng ký
                                ngay!</router-link></small>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal xác nhận email -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-box">
                <h5 class="mb-3">Xác nhận Email</h5>
                <p>Bạn đã nhập email: <strong>{{ email }}</strong></p>
                <p>Chính xác là email này? Mã OTP sẽ được gửi đến email này.</p>
                <div class="d-flex justify-content-end gap-2 mt-3">
                    <button class="btn btn-secondary" @click="showModal = false">Huỷ</button>
                    <button class="btn bg-newColorbtn" @click="confirmEmail">Xác nhận</button>
                </div>
            </div>
        </div>

        <!-- Modal nhập OTP và mật khẩu -->
        <div v-if="showOTPModal" class="modal-overlay">
            <div class="modal-box">
                <h5 class="mb-3">Nhập mã OTP</h5>
                <p>Mã OTP đã được gửi đến email <strong>{{ email }}</strong></p>

                <div v-if="!otpVerified">
                    <input v-model="otp" type="text" class="form-control mb-3" placeholder="Nhập mã OTP" />
                    <p v-if="otpError" class="text-danger" style="font-size: 14px;">{{ otpError }}</p>
                    <p v-if="countdown > 0" class="text-muted" style="font-size: 14px;">Còn lại: {{ countdown }} giây
                    </p>
                    <button v-if="canResendOTP" class="btn btn-link text-danger p-0" @click="resendOTP">Chưa nhận
                        được mã OTP? Gửi lại</button>

                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <button class="btn btn-secondary" @click="showOTPModal = false">Huỷ</button>
                        <button class="btn bg-newColorbtn" @click="verifyOTP">Xác minh</button>
                    </div>
                </div>

                <div v-else>
                    <div class="mb-3">
                        <label for="password" class="form-label">Tạo mật khẩu</label>
                        <input v-model="password" type="password" class="form-control"
                            placeholder="Nhập mật khẩu mới" />
                        <p v-if="passwordError" class="text-danger" style="font-size: 14px;">{{ passwordError }}</p>
                    </div>
                    <button class="btn bg-newColorbtn w-100" @click="submitRegister">Hoàn tất đăng ký</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegisterPage',
    data() {
        return {
            email: '',
            showModal: false,
            showOTPModal: false,
            otp: '',
            generatedOtp: '',
            otpVerified: false,
            password: '',
            countdown: 60,
            countdownInterval: null,
            otpError: '',
            passwordError: '',
            canResendOTP: false
        };
    },
    methods: {
        handleNext() {
            if (!this.email) {
                alert("Vui lòng nhập email!");
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.email)) {
                alert("Email không hợp lệ!");
                return;
            }
            this.showModal = true;
        },

        confirmEmail() {
            this.showModal = false;
            this.generatedOtp = "123456";  // Simulated OTP
            alert(`Mã OTP đã được gửi đến ${this.email}`);
            this.showOTPModal = true;
            this.canResendOTP = true;
        },

        verifyOTP() {
            this.otpError = '';

            if (this.otp === this.generatedOtp) {
                alert("Xác minh thành công!");
                this.otpVerified = true;
            } else {
                this.otpError = "Mã OTP không đúng. Vui lòng thử lại.";
            }
        },

        submitRegister() {
            this.passwordError = '';

            if (!this.password || this.password.length < 6) {
                this.passwordError = "Mật khẩu phải có ít nhất 6 ký tự.";
                return;
            }

            if (!this.checkPasswordStrength()) {
                this.passwordError = "Mật khẩu phải chứa ít nhất một ký tự in hoa, một ký tự thường, một chữ số và một ký tự đặc biệt.";
                return;
            }

            alert(`Đăng ký thành công với email ${this.email} và mật khẩu: ${this.password}`);
            this.resetForm();
        },

        startCountdown() {
            this.canResendOTP = false;
            this.countdown = 60;

            this.countdownInterval = setInterval(() => {
                if (this.countdown == 1) {
                    clearInterval(this.countdownInterval);
                    this.canResendOTP = true;
                }
                if (this.countdown > 0) {
                    this.countdown--;
                }
            }, 1000);
        },

        resendOTP() {
            if (!this.canResendOTP) return;

            this.generatedOtp = "1234567";
            alert(`Mã OTP đã được gửi lại đến ${this.email}`);
            this.startCountdown();
        },

        resetForm() {
            this.email = '';
            this.password = '';
            this.otp = '';
            this.generatedOtp = '';
            this.showOTPModal = false;
            this.otpVerified = false;
            this.countdown = 60;
            this.canResendOTP = false;  // Reset resend button state
            clearInterval(this.countdownInterval);  // Clear any existing countdown
        },

        checkPasswordStrength() {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            return passwordRegex.test(this.password);
        }
    }
};
</script>
<style scoped>
.bg-newColor {
    background-color: #E4D5B4;
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

@media (max-width: 768px) {
    .bg-newColorbtn {
        font-size: 0.875rem;
        /* Adjusted for smaller screens */
        padding: 0.625rem;
        /* Adjusted for smaller screens */
    }
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

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-box {
    background: white;
    padding: 1.5rem;
    /* Adjusted to rem */
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.logo {
    max-width: 100%;
    /* Giới hạn chiều rộng tối đa */
    height: auto;
    /* Giữ tỉ lệ khung hình */
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1.25rem;
    /* Khoảng cách dưới ảnh */
}

.logo:hover {
    transform: scale(1.1);
    transition: transform 1s ease;
}

a {
    text-decoration: none;
}

.router-link-exact-active,
.router-link-active {
    text-decoration: none;
}
</style>