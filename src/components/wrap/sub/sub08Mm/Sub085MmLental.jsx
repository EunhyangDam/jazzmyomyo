import React,{useEffect, useMemo, useState} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";
import './scss/Sub085MmLental.scss';

export default function Sub085MmLental(){

    const dispatch = useDispatch();
    const modal = useSelector((s) => s.confirmModal);  

    // 목록 상태
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);  

    
    // 정렬 & 월 필터
    // createdDesc(기본), nameAsc 두 가지
    const [sort, setSort] = useState("createdDesc");
    const [month, setMonth] = useState("all");    


    // 다운로드 대기 상태
    const [pending, setPending] = useState(null); // { id, fileName } 

    // 최근 12개월 옵션 생성
    const monthOptions = useMemo(() => {
      const arr = [{ label: "전체", value: "all" }];
      const now = new Date();
      for (let i = 0; i < 12; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const v = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        arr.push({ label: v, value: v });
      }
      return arr;
    }, []); 

    // 데이터 로드
    const load = React.useCallback(() => {
        // 기본값: 최신순
        let sKey = 'created';
        let sOrder = 'desc';
        if (sort === 'createdAsc') {
          sKey = 'created'; sOrder = 'asc';     // 신청순(오래된)
        } else if (sort === 'nameAsc') {
          sKey = 'name';    sOrder = 'asc';     // 이름순
        }
    
        const params = {
          sort: sKey,
          order: sOrder,
          month: month === 'all' ? '' : month,
          page,
          perPage,
        };

        axios
          .get("/jazzmyomyo/lental_list_api.php", { params })
          .then(({ data }) => {
            setRows(data?.rows ?? []);
            setTotal(data?.total ?? 0);
          })
          .catch(() => {
            dispatch(
              confirmModalAction({
                heading: "알림!",
                explain: "목록을 불러오지 못했습니다.",
                isON: true,
                isConfirm: false,
                message1: "",
                message2: "",
              })
            );
          });
    }, [sort, month, page, perPage, dispatch]); 

    useEffect(() => {
      load();
    }, [load]); 

    // 파일명 클릭 → “다운로드 할까요?” (예/아니오)
    const onClickFile = (row) => {
      setPending({ id: row.id, fileName: row.file_orig_name });
      dispatch(confirmModalYesNoAction(false)); // 초기화
      dispatch(
        confirmModalAction({
          heading: "다운로드 할까요?",
          explain: row.file_orig_name,
          isON: true,
          isConfirm: true,
          message1: "예",
          message2: "아니오",
        })
      );
    };  

    // 모달 응답 감지 → 예일 때만 다운로드
    useEffect(() => {
      if (!modal.isYes || !pending) return;
    
      axios.get("/jazzmyomyo/lental_download.php", {
        params: { id: pending.id },
        responseType: "blob",
      })
      .then(res => {
        const cd = res.headers["content-disposition"] || "";
        let filename = "download";
        const m = cd.match(/filename\*?=UTF-8''([^;]+)/i) || cd.match(/filename="([^"]+)"/i);
        if (m && m[1]) filename = decodeURIComponent(m[1]);
    
        const url = URL.createObjectURL(res.data);
        const a = document.createElement("a");
        a.href = url; a.download = filename; document.body.appendChild(a);
        a.click(); a.remove(); URL.revokeObjectURL(url);
      })
      .catch(() => {
        dispatch(confirmModalAction({ 
            heading:"알림!", 
            explain:"다운로드 실패", 
            isON:true, 
            isConfirm:false, 
            message1:"", 
            message2:""
        }));
      })
      .finally(() => {
        setPending(null);
        dispatch(confirmModalYesNoAction(false));
        dispatch(confirmModalAction({ 
            heading:"", 
            explain:"", 
            isON:false, 
            isConfirm:false, 
            message1:"", 
            message2:"" 
        }));
      });
    }, [modal.isYes, pending, dispatch]);

    // 페이지네이션
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const startNo = (page - 1) * perPage + 1;   
    const goPage = (p) => {
      if (p < 1 || p > totalPages) return;
      setPage(p);
    };  
    // 상단 컨트롤 변경 시 1페이지부터
    const onChangeSort = (e) => {
      setSort(e.target.value);
      setPage(1);
    };
    const onChangeMonth = (e) => {
      setMonth(e.target.value);
      setPage(1);
    };


    return(
        <div id="Sub085MmLental">
            <div className="rental-list">
                <aside className="sidebar">
                    <h2>회원관리</h2>
                    <ul>
                      <li><Link to="/Mm">회원리스트</Link></li>
                      <li><Link to="/MmGrade">회원등급설정</Link></li>
                      <li><Link to="/MmSign">회원가입설정</Link></li>
                      <li className="active"><Link to="/MmLental">대관신청관리</Link></li>
                      <li><Link to="/MmTk">공연예매 현황</Link></li>
                    </ul>
                </aside>

                <div className="main">
                    <div className="top-title">
                        <h1 className="title">대관신청리스트</h1>
                        <div className="controls">
                            <label>
                                <select value={sort} onChange={onChangeSort}>
                                  <option value="createdDesc">최신순</option>
                                  <option value="OrderApplication">신청순</option>
                                  <option value="nameAsc">이름순</option>
                                </select>
                                정렬
                            </label>
                            <label>
                                <select value={month} onChange={onChangeMonth}>
                                  {monthOptions.map((m) => (
                                        <option key={m.value} value={m.value}>
                                            {m.label}
                                        </option>
                                  ))}
                                </select>
                                신청월
                            </label>
                            <label>
                                <select value={perPage} onChange={(e) => { setPerPage(+e.target.value); setPage(1); }}>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                                페이지당
                            </label>
                        </div>
                    </div>
                      
                <section className="tablewrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th >번호</th>
                        <th>신청일</th>
                        <th>이름</th>
                        <th>대관신청서</th>
                        <th>연락처</th>
                        <th>이메일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="empty">데이터가 없습니다.</td>
                        </tr>
                      ) : (
                        rows.map((r, i) => (
                          <tr key={r.id} className="card-row">
                            <td data-label="번호">{startNo + i}</td>
                            <td data-label="신청일">{(r.created_at || "").slice(0, 10)}</td>
                            <td data-label="이름">{r.name}</td>
                            <td data-label="대관신청서">
                              {r.file_orig_name ? (
                                <button type="button" className="file-link" onClick={() => onClickFile(r)}>
                                  {r.file_orig_name}
                                </button>
                              ) : ("-")}
                            </td>
                            <td data-label="연락처">{r.phone}</td>
                            <td data-label="이메일">{r.email}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  
                </section>
                <nav className="pagination">
                  <button onClick={() => setPage(1)} disabled={page === 1}>« 처음</button>
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>‹ 이전</button>
                        
                  {Array.from({ length: totalPages }, (_, i) => {
                    const n = i + 1;
                    return (
                      <button
                        key={n}
                        className={`page ${page === n ? "active" : ""}`}
                        onClick={() => setPage(n)}
                      >
                        {n}
                      </button>
                    );
                  })}
        
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>다음 ›</button>
                  <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>끝 »</button>
                </nav>
                </div>
            </div>
        </div>
    )
}