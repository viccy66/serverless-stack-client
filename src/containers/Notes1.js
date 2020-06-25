import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage, } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css";
import { s3Upload } from "../libs/awsLib";

export default function Notes() {
console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Notes()  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    const file = useRef(null);
    const { id } = useParams();
    const history = useHistory();
    const [note, setNote] = useState(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadNote() {
console.log("-----------------------------  loadNote()  @@@@@@@@@@@@@@@@@@@@@@@@");
      const getNote = API.get("notes", `/notes/${id}`);
      return getNote;
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        var { content, attachment, userId, noteId } = note;
console.log("-----------------------------  content : ", content, "  attachment : ", attachment, "  userId : ", userId, "  noteId : ", noteId, "  ------------------------------");
        const rvAttch = await Storage.vault.remove(attachment);

        await API.put("notes", `/notes/${id}`, {
          body: {
            content,
            attachment: null
          }
        });

        attachment = null;
console.log("---------------  attachment : ", attachment, "  -------------");
 /*       if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
//          const rmvAttch = await Storage.vault.remove(attachment);
//          var rmvFl = await Storage.vault.list("notes-tuto");
console.log("----------          Un fichier est déattaché de la note : ", note.attachmentURL, "          ----------");
        }*/

        setContent(content);
        setNote(note);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return content.length > 0;
  }
  
  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }
  
  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  
  /*
  async function handleSubmit(event) {
    let attachment;
  
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
  
    setIsLoading(true);
  }
  */

 function saveNote(note) {
    return API.put("notes", `/notes/${id}`, {
      body: note
    });
  }
  
  async function handleSubmit(event) {
    let attachment;
  
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }
  
      await saveNote({
        content,
        attachment: attachment || note.attachment
      });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
  
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    const { content, attachment, userId, noteId } = await API.get("notes", `/notes/${id}`);
    if(attachment) {
      await Storage.vault.remove(attachment);
    }

    await API.del("notes", `/notes/${id}`);
    history.push("/");
  }
  
  return (
    <div className="Notes">
      {note && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              value={content}
              componentClass="textarea"
              onChange={e => setContent(e.target.value)}
            />
          </FormGroup>
          {note.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={note.attachmentURL}
                >
                  {formatFilename(note.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!note.attachment && <ControlLabel>Attachment</ControlLabel>}
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}