import { useSearchParams } from "react-router-dom";
import styles from "./VerifyAccount.module.css"
import { useEffect } from "react";
import { verifyAccountAPI } from "../../apis";
import { useNavigate } from "react-router-dom";

export const VerifyAccount = () => {

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const verifyAccount = async () => {
        const token = params.get("token");
        try {
            const { msg } = await verifyAccountAPI({ token });
            navigate("/");
            setTimeout(() => alert(msg), 500);
        }
        catch (e) {
            alert(e.message);
            navigate("/");
        }
    }

    useEffect(() => {
        verifyAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<div>

        <div className={styles.loading}>
            <div style={{ fontSize: "30px" }}>verification under progress...</div>
            <i className="fa fa-spinner fa-spin" style={{ fontSize: "50px", display: "inline-block" }}></i>
        </div>
    </div>)
}