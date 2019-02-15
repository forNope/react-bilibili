import * as React from "react";
import * as styles from "./styles.scss";
import * as danmu from "./assets/danmu.png";

export const LoginTip: React.SFC = () => (
	<div className={styles["login-tip-box"]} data-role="login-tip">
		<div className={styles.inner}>
			<p className={styles["tip-text"]}>登陆后你可以:</p>
			<div className={styles["pic-outer-box"]}>
				<div className={styles["pic-inner-box"]} data-role="animation">
					<img src={danmu}/>
					<img src={danmu} alt="danmu"/>
				</div>
			</div>
			<a className={styles.login} href="#">登陆</a>
			<p className={styles["reg-text"]}>首次使用？<a className={styles["reg-link"]} href="#">点我去注册</a></p>
		</div>
	</div>
);
