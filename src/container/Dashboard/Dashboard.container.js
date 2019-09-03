import React, { useState, useEffect, useContext } from "react";
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
import Modal from "react-modal";
import * as yup from "yup";
import { DashbaordStore } from "store/Dashboard.store";
import { observer } from "mobx-react";
import Input from "component/Input/Input.component";
import ContactInfo from 'component/ContactInfo/ContactInfo.component'

const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("Please enter first name"),
  lastName: yup
    .string()
    .trim()
    .required("Please enter last name"),
  role: yup
    .string()
    .trim()
    .required("Please enter role"),
  email: yup
    .string()
    .trim()
    .required("Please provide email address")
    .email("Please provide valid email address"),
  phone: yup
    .string()
    .trim()
    .required("Please enter phone number"),
  company: yup
    .string()
    .trim()
    .required("Please enter company"),
  address: yup
    .string()
    .trim()
    .required("Please enter address")
});

const customStyles = {
  content: {
    top: "50%",
    minWidth: "500px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const Dashboard = () => {
  const { getContacts, contacts, setContacts } = useContext(DashbaordStore);

  // const [contacts, setContacts] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [isEdit, setIsEdit] = useState(-1);
  const [searchedText, setSearchedText] = useState("");
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [err, setErr] = useState("");
  const [contactVars, setContactVars] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    phone: "",
    company: "",
    address: ""
  });
  useEffect(() => {
    (async () => {
      await getContacts();
      if (searchedText.length === 0) {
        // setContacts(data);
        contacts?.length > 0 && setContactInfo(contacts[0]);
      } else {
        let searchResult = [];
        contacts.forEach(item => {
          if (
            item?.firstName.toLowerCase().includes(searchedText) ||
            item?.lastName.toLowerCase().includes(searchedText)
          ) {
            searchResult.push(item);
          }
        });
        setContacts(searchResult);
      }
    })();
  }, [searchedText]);

  const changeDetail = i => {
    setContactInfo(contacts[i]);
  };

  const handleAddContact = async () => {
    var valitdationRes = await schema
      .validate(contactVars, { abortEarly: false })
      .catch(err => {
        setErr(err?.errors[0]);
        setIsEdit(false);
        return;
      });
    if (valitdationRes) {
      if (isEdit !== -1) {
        let tempContacts = contacts;
        contacts.forEach((item, i) => {
          if (item.id === isEdit) {
            tempContacts[i] = {
              id: item.id,
              firstName: contactVars.firstName,
              lastName: contactVars.lastName,
              role: contactVars.role,
              phone: contactVars.phone,
              email: contactVars.email,
              company: contactVars.company,
              address: contactVars.address
            };
            setContactInfo(tempContacts[item.id])
          }
        });
        setContacts(tempContacts);
        
        setIsEdit(-1);
        setErr("Contact has been updated");
      } else {
        setContacts([contactVars].concat(contacts));
        setErr("Contact has been added");
        setContactVars({
          id: contacts.length + 1,
          firstName: "",
          lastName: "",
          role: "",
          email: "",
          phone: "",
          email: "",
          company: "",
          address: ""
        });
      }
    }
  };

  const resetModal = () => {
    setContactModalOpen(false);
    setErr("");
    setContactVars({
      firstName: "",
      lastName: "",
      role: "",
      phone: "",
      email: "",
      company: "",
      address: ""
    });
  };

  return (
    <div>
      <Modal
        isOpen={isContactModalOpen}
        onRequestClose={() => {
          resetModal();
        }}
        style={customStyles}
        shouldCloseOnOverlayClick
      >
        <div className="contact__modal_content">
          <div className="modal__title__row">
            <div className="modal__title">{`${
              isEdit !== -1 ? "Edit" : "Add"
            } Contact`}</div>
            <div
              className="modal__close__btn"
              onClick={() => {
                resetModal();
              }}
            >
              <img src={images.close_icon} alt="close" />
            </div>
          </div>
          <div className="modal__fields__content">
            <div className="modal__input__field">
              <Input
                type="text"
                placeholder="First Name"
                value={contactVars.firstName}
                onChange={e => {
                  setContactVars({ ...contactVars, firstName: e.target.value });
                }}
              />
            </div>
            <div className="modal__input__field">
              <Input
                type="text"
                placeholder="Last Name"
                value={contactVars.lastName}
                onChange={e => {
                  setContactVars({ ...contactVars, lastName: e.target.value });
                }}
              />
            </div>
            <div className="modal__input__field">
              <Input
                type="text"
                placeholder="role"
                value={contactVars.role}
                onChange={e => {
                  setContactVars({ ...contactVars, role: e.target.value });
                }}
              />
            </div>
            <div className="modal__input__field">
              <Input
                type="text"
                placeholder="Email"
                value={contactVars.email}
                onChange={e => {
                  setContactVars({ ...contactVars, email: e.target.value });
                }}
              />
            </div>
            <div className="modal__input__field">
              <Input
                type="text"
                placeholder="Phone"
                value={contactVars.phone}
                onChange={e => {
                  setContactVars({ ...contactVars, phone: e.target.value });
                }}
              />
            </div>
            <div className="modal__input__field">
              <Input
                type="text"
                placeholder="Company"
                value={contactVars.company}
                onChange={e => {
                  setContactVars({ ...contactVars, company: e.target.value });
                }}
              />
            </div>
            <div className="modal__input__field">
              <Input
                type="text"
                placeholder="Address"
                value={contactVars.address}
                onChange={e => {
                  setContactVars({ ...contactVars, address: e.target.value });
                }}
              />
            </div>
            {err !== "" && (
              <div className="modal__input__field">
                <div className="validation__err">{err}</div>
              </div>
            )}
            <div className="modal__input__field">
              <div className="add__contact">
                <button
                  className="add_contact__btn"
                  onClick={() => {
                    handleAddContact();
                  }}
                >
                  <div className="add_contact_btn_text">{`${isEdit !== -1 ? 'Edit' : 'Add'} Contact`}</div>
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
                <Input
                  type="text"
                  placeholder="Search"
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
                              <img
                                src={images.edit_icon}
                                alt="edit"
                                onClick={() => {
                                  setContactVars({
                                    firstName: contact.firstName,
                                    lastName: contact.lastName,
                                    role: contact.role,
                                    email: contact.email,
                                    phone: contact.phone,
                                    company: contact.company,
                                    address: contact.address
                                  });
                                  setIsEdit(contact.id);
                                  setContactModalOpen(true);
                                }}
                              />
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
                  {contactInfo !== null && (<ContactInfo contactInfo={contactInfo} />)}
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default observer(Dashboard);
