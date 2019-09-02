import React, { useState, useEffect } from "react";
import Navigation from "component/Navigation/Navigation.component";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "./Dashboard.scss";
import { images } from "config/images";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    minWidth: "500px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  }
};

const Dashboard = () => {
  const [contacts, setContacts] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [searchedText, setSearchedText] = useState("");
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        let res = await require("config/data");
        let data = res?.data?.response;
        if (searchedText.length === 0) {
          setContacts(data);
          data?.length > 0 && setContactInfo(data[0]);
        } else {
          let searchResult = [];
          data.forEach(item => {
            console.log("in here", item);
            if (
              item?.firstName.toLowerCase().includes(searchedText) ||
              item?.lastName.toLowerCase().includes(searchedText)
            ) {
              searchResult.push(item);
            }
          });
          setContacts(searchResult);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [searchedText]);

  const changeDetail = i => {
    setContactInfo(contacts[i]);
  };

  return (
    <div>
      <Modal
        isOpen={isContactModalOpen}
        onRequestClose={() => setContactModalOpen(false)}
        style={customStyles}
        shouldCloseOnOverlayClick
      >
        <div className="contact__modal_content">
          <div className="modal__title__row">
            <div className="modal__title">Add Contact</div>
            <div
              className="modal__close__btn"
              onClick={() => {
                setContactModalOpen(false);
              }}
            >
              <img src={images.close_icon} alt="close" />
            </div>
          </div>
          <div className="modal__fields__content">
            <div className="modal__input__field">
              <input
                type="text"
                className="search__input__box"
                placeholder="First Name"
                onChange={e => {}}
              />
            </div>
            <div className="modal__input__field">
              <input
                type="text"
                className="search__input__box"
                placeholder="Last Name"
                onChange={e => {}}
              />
            </div>
            <div className="modal__input__field">
              <input
                type="text"
                className="search__input__box"
                placeholder="Email"
                onChange={e => {}}
              />
            </div>
            <div className="modal__input__field">
              <input
                type="text"
                className="search__input__box"
                placeholder="Phone"
                onChange={e => {}}
              />
            </div>
            <div className="modal__input__field">
              <input
                type="text"
                className="search__input__box"
                placeholder="Company"
                onChange={e => {}}
              />
            </div>
            <div className="modal__input__field">
              <input
                type="text"
                className="search__input__box"
                placeholder="Address"
                onChange={e => {}}
              />
            </div>
            <div className="modal__input__field">
            <div className="add__contact">
                <button
                  className="add_contact__btn"
                  onClick={() => {
                    setContactModalOpen(true);
                  }}
                >
                  <div className="add_contact_btn_text">Add Contact</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Navigation />
      <Container maxWidth="xl">
        <Grid item xs={12}>
          <div className="main__container">
            <div className="contact__label">
              <div className="contact__img"></div>
              <div className="contact__text__container">
                <div className="contact__text">Contacts</div>
                <div className="contact__desc">Contact list</div>
              </div>
            </div>
            <div className="search__content">
              <div className="search__field">
                <input
                  type="text"
                  className="search__input__box"
                  placeholder="Search Contact"
                  value={searchedText}
                  onChange={e => {
                    setSearchedText(e.target.value.toLowerCase());
                  }}
                />
              </div>
              <div className="add__contact">
                <button
                  className="add_contact__btn"
                  onClick={() => {
                    setContactModalOpen(true);
                  }}
                >
                  <img src={images.add_icon} className="add_icon" alt="add" />
                  <div className="add_contact_btn_text">Add Contact</div>
                </button>
              </div>
            </div>
            <div className="contact__container">
              <Grid container spacing={10}>
                <Grid item md={12} lg={6}>
                  <div className="contact__table">
                    <Table>
                      <TableHead className="table__header">
                        <TableRow>
                          <TableCell>
                            <img
                              src={images.add_icon_black}
                              className="add_icon"
                              alt="add"
                            />{" "}
                          </TableCell>
                          <TableCell>Basic Info</TableCell>
                          <TableCell>Company</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {contacts?.map((contact, i) => (
                          <TableRow
                            key={i}
                            className="table__row"
                            onClick={() => changeDetail(i)}
                          >
                            <TableCell>
                              <img src={images.edit_icon} alt="edit" />
                            </TableCell>
                            <TableCell>
                              <div className="contact_name_with_label">
                                <div className="initials_circle">
                                  <div className="name_initails">
                                    <div className="name_initials_text">
                                      {`${contact?.firstName.charAt(
                                        0
                                      )}${contact?.lastName?.charAt(0)}`}
                                    </div>
                                  </div>
                                </div>

                                <div className="contact__namebox">
                                  <div className="contact__name">
                                    {`${contact?.firstName} ${contact?.lastName}`}
                                  </div>
                                  <div className="contact__email">
                                    {contact.email}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{contact?.company}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Grid>
                <Grid item md={12} lg={6}>
                  <div className="contact__info">
                    <div className="info__content">
                      <div className="basic__info__row">
                        <div className="basic__info">
                          <div className="basic_info_initials">
                            {`${contactInfo?.firstName.charAt(
                              0
                            )}${contactInfo?.lastName?.charAt(0)}`}
                          </div>
                          <div className="basic__info__name">
                            {`${contactInfo?.firstName} ${contactInfo?.lastName}`}
                          </div>
                          <div className="basic__info__role">
                            {`${contactInfo?.role} @ ${contactInfo?.company}`}
                          </div>
                        </div>
                      </div>
                      <div className="info__table__content">
                        <table className="info__table">
                          <tr className="info__table__row">
                            <td className="info__table__cell">Full Name</td>
                            <td className="info__table__cell">{`${contactInfo?.firstName} ${contactInfo?.lastName}`}</td>
                          </tr>
                          <tr className="info__table__row">
                            <td className="info__table__cell">Email</td>
                            <td className="info__table__cell">
                              {contactInfo?.email}
                            </td>
                          </tr>
                          <tr className="info__table__row">
                            <td className="info__table__cell">Phone</td>
                            <td className="info__table__cell">
                              {contactInfo?.phone}
                            </td>
                          </tr>
                          <tr className="info__table__row">
                            <td className="info__table__cell">Company</td>
                            <td className="info__table__cell">
                              {contactInfo?.company}
                            </td>
                          </tr>
                          <tr className="info__table__row">
                            <td className="info__table__cell">Address</td>
                            <td className="info__table__cell">
                              {contactInfo?.address}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
