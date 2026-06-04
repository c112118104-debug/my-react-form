import { useFormik } from "formik";
import { useState } from "react";
import { FaUser, FaEnvelope, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import * as Yup from "yup"; // 1. 引入 Yup

export default function SimpleForm() {
    const [showPopup, setShowPopup] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
        },
        // 2. 將原本的 validate 替換為 validationSchema
        validationSchema: Yup.object({
            name: Yup.string()
                .required("姓名不可為空白")               // 必填驗證
                .max(18, "姓名最多只能輸入 18 個字"),     // 字數上限驗證
            
            email: Yup.string()
                .required("E-Mail 不可為空白")            // 必填驗證
                // Yup 其實有內建 .email("格式錯誤")，但為了完美保留你原本的正規表達式，我們使用 .matches()
                .matches(
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    "E-Mail 格式不正確 (例如: user@example.com)"
                )
        }), 
        onSubmit: (values, { resetForm }) => {
            setSubmittedData(values);
            setShowPopup(true);       
            resetForm();              
        },
    });

    return (
        <div style={{ padding: "20px", position: "relative" }}> 
            <form onSubmit={formik.handleSubmit} style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                
                {/* Name 區塊 */}
                <div>
                    <label htmlFor="name" style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "5px" }}>
                        <FaUser color="#555" /> Your Name
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                            {formik.errors.name}
                        </div>
                    ) : null}
                </div>
                
                {/* E-mail 區塊 */}
                <div>
                    <label htmlFor="email" style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "5px" }}>
                        <FaEnvelope color="#555" /> Your E-Mail
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>
                
                <button 
                    type="submit" 
                    disabled={formik.isSubmitting}
                    style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "24px", padding: "5px 10px", cursor: "pointer" }}
                >
                    <FaPaperPlane /> Submit
                </button>
            </form>

            {/* 成功彈跳視窗的 UI */}
            {showPopup && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.5)", 
                    display: "flex", justifyContent: "center", alignItems: "center",
                    zIndex: 1000 
                }}>
                    <div style={{
                        backgroundColor: "white", padding: "30px", borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)", textAlign: "center",
                        minWidth: "250px"
                    }}>
                        <FaCheckCircle size={40} color="green" style={{ marginBottom: "10px" }} />
                        <h3 style={{ color: "green", marginTop: 0 }}>提交成功！</h3>
                        <p><strong>姓名：</strong> {submittedData?.name}</p>
                        <p><strong>信箱：</strong> {submittedData?.email}</p>
                        
                        <button 
                            onClick={() => setShowPopup(false)} 
                            style={{ 
                                marginTop: "15px", padding: "5px 15px", 
                                cursor: "pointer", backgroundColor: "#007BFF", 
                                color: "white", border: "none", borderRadius: "4px" 
                            }}
                        >
                            確定並關閉
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}