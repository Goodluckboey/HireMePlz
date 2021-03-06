import React, { useEffect, useState } from "react";
import tags from "../../../data/tags";
import { v4 as uuidv4 } from "uuid";
import styles from "./modules/skilltags.module.css";

const TagsCheckBoxBundle = ({ handleData }) => {
  const [checkBoxes, setCheckBoxes] = useState(
    tags.reduce((tags, tag) => ({ ...tags, [tag]: false }), {})
  );

  useEffect(() => {
    const tags = [];
    for (const [tag, value] of Object.entries(checkBoxes)) {
      if (value) {
        tags.push(tag);
      }
    }
    handleData(tags);
  }, [checkBoxes]);

  const tagsArray = tags.map((tag) => {
    return (
      <div className={styles.tag} key={uuidv4()}>
        <input
          type="checkbox"
          checked={checkBoxes[tag]}
          id={tag}
          onChange={(e) => {
            setCheckBoxes({ ...checkBoxes, [tag]: e.target.checked });
          }}
          class="form-check-input"
        />
        <label style={{height: "12px"}} htmlFor={tag}>{tag}</label>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.tagsGroup}>{tagsArray}</div>
    </div>
  );
};

export default TagsCheckBoxBundle;
