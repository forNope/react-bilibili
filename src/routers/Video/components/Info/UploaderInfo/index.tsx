import * as React from "react";
import * as styles from "./styles.scss";

export interface IUploaderProps {
	name: string;
	spaceHref: string;
	signature: string;
	avatarPic: string;
	num: {
		upload: string | number;
		fans: string | number;
	};
	liveInfo?: {
		state: "rolling" | "live";
		href: string;
	};
}

export const UploaderInfo: React.SFC<IUploaderProps> = ({
	name,
	avatarPic,
	spaceHref,
	signature,
	num,
	liveInfo,
}) => (
		<div className={styles.info}>
			<div className={styles.left}>
				{liveInfo
					? (
						<a className={styles["live-state"]} href={liveInfo.href}>
							{liveInfo.state === "rolling" ? "轮播中" : "直播中"}
						</a>
					)
					: null}
				<img className={styles.pic} src={avatarPic} alt={name} />
			</div>

			<div className={styles.right}>
				<div className={styles.username}>
					<a className={styles.name} href={spaceHref}>{name}</a>
					<a className={styles["private-msg"]} href="javascript: void(0)">发信息</a>
				</div>

				<div className={styles.signature} title={signature}>
					{signature}
				</div>

				<div>
					<p className={styles.upload}>投稿: {num.upload}</p>
					<p className={styles.fans}>粉丝: {num.fans}</p>
				</div>

				<button className={styles.attention}>+关注</button>
			</div>
		</div>
	);
