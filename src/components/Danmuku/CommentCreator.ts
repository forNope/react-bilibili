import {merge} from "@helps/object";
import {ICommentData, IComment} from "./interface";
import {addStyle, on} from "@helps/DOM";
import * as styles from "./styles.scss";

/**
 * static class
 * to be responsible for the maintenance comment object
 */

export class CommentCreator {
	private static commentPool: Array<Array<IComment>> =
		               new Array(3)
			               .fill(null)
			               .map((_, i) => {
				               return new Array(20)
					               .fill(null)
					               .map(() => ({
						               el: document.createElement("div"),
						               isUsing: false,
						               speed: 1,
						               liveTime: 5,
						               mode: 0,
					               }));
			               });
	
	public static create (data: ICommentData): IComment {
		const comment = this.getIdleComment(data.mode);
		this.attachData(comment, data);
		return comment;
	}
	
	public static recycling (comment?: IComment) {
		if (comment) {
			comment.speed = 1;
			comment.liveTime = 5;
			comment.animationEnd = null;
			comment.update = null;
			comment.isUsing = false;
			comment.el.style.cssText = "";
		} else {
			this.commentPool.forEach((pool) => {
				pool.forEach((comment) => {
					this.recycling(comment);
				});
			});
		}
	}
	
	public static destroy () {
		this.commentPool = [];
	}
	
	private static attachData (comment: IComment, data: ICommentData) {
		const {
			      size     = 23,
			      color    = "white",
			      speed    = 1,
			      liveTime = 5,
			      mode,
			      content,
		      }    = data,
		      {el} = comment;
		comment.speed = speed;
		comment.liveTime = liveTime;
		comment.mode = mode;
		addStyle(el, {
			color,
			fontSize: size + "px",
		});
		el.className = styles.danmu;
		el.textContent = content;
	}
	
	private static addNewCommentToPool (mode: number) {
		const pool   = this.getPool(mode),
		      el     = document.createElement("div"),
		      result = {
			      el,
			      isUsing: false,
			      speed: 1,
			      liveState: 5,
			      mode: 0,
		      };
		pool.push(result);
		return result;
	}
	
	private static getIdleComment (mode: number) {
		const pool = this.getPool(mode);
		for (const comment of pool) {
			if (!comment.isUsing) {
				return comment;
			}
		}
		
		return this.addNewCommentToPool(mode);
	}
	
	private static getPool (mode: number) {
		if (!this.commentPool[mode]) {
			this.commentPool[mode] = [];
		}
		
		return this.commentPool[mode];
	}
}
