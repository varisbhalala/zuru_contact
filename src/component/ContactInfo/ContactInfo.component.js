import React from "react";
import "./ContactInfo.scss";

const ContactInfo = ({ contactInfo }) => {
  return (
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
            <tbody>
              <tr className="info__table__row">
                <td className="info__table__cell">Full Name</td>
                <td className="info__table__cell">{`${contactInfo?.firstName} ${contactInfo?.lastName}`}</td>
              </tr>
              <tr className="info__table__row">
                <td className="info__table__cell">Email</td>
                <td className="info__table__cell">{contactInfo?.email}</td>
              </tr>
              <tr className="info__table__row">
                <td className="info__table__cell">Phone</td>
                <td className="info__table__cell">{contactInfo?.phone}</td>
              </tr>
              <tr className="info__table__row">
                <td className="info__table__cell">Role</td>
                <td className="info__table__cell">{contactInfo?.role}</td>
              </tr>
              <tr className="info__table__row">
                <td className="info__table__cell">Company</td>
                <td className="info__table__cell">{contactInfo?.company}</td>
              </tr>
              <tr className="info__table__row">
                <td className="info__table__cell">Address</td>
                <td className="info__table__cell">{contactInfo?.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo
