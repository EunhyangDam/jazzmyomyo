import React from "react";
import "./scss/ArtistModalComponent.scss";

export default function ArtistModalComponent({ artist, onClose }){
    if(!artist) return null;


    return (
        <div className="artist-modal">
        <div className="modal-bg" onClick={onClose}></div>
        <div className="modal-container">
            <button className="close-btn" onClick={onClose}>닫기</button>

            <div className="modal-inner">
            {/* 좌측 아티스트 이미지 + 소개 텍스트 (수평 배치) */}
            <div className="top-box">
                <div className="artist-img-box">
                {artist.artistImg && <img src={artist.artistImg} alt={artist.name} />}
                </div>
                <div className="artist-info">
                <h2>{artist.name}</h2>
                <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: artist.description }}
                />
                </div>
            </div>

            {/* info-group: 아래 전체 가로 폭으로 빠짐 */}
            <div className="info-section">
                <div className="info-group">
                <p><strong>악기 구성 :</strong></p>
                <div className="tags">
                    {artist.instruments?.map((item, idx) => (
                    <span key={idx} className="tag">{item}</span>
                    ))}
                </div>
                </div>

                <div className="info-group">
                <p><strong>장르 / 스타일 :</strong> {artist.genre}</p>
                </div>

                <div className="info-group">
                <p><strong>공연 날짜 :</strong> {artist.date}</p>
                </div>
            </div>

            {/* 밴드 멤버 */}
            {artist.members?.length > 0 && (
                <div className="band-members">
                <hr className="divider" />
                <h3>BAND MEMBERS</h3>
                <div className="member-list">
                    {artist.members.map((member, idx) => (
                    <div className="member" key={idx}>
                        <div className="circle">
                        {member.img ? (
                            <img src={member.img} alt={member.name} />
                        ) : (
                            <div className="default-img" />
                        )}
                        </div>
                        <span>{member.name}</span>
                    </div>
                    ))}
                </div>
                </div>
            )}
            </div>
        </div>
        </div>
    );
    }