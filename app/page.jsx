'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const doctors = { 全科门诊: '林知夏', 皮肤专科: '陆一鸣', 疫苗接种: '沈安' };
const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
const storageKey = 'pawhouse-visits';
const services = [
  ['预约挂号', 'calendar', '#e0eccc'],
  ['找医生', 'doctor', '#dfeae6'],
  ['疫苗接种', 'vaccine', '#f6e6c9'],
  ['就诊记录', 'record', '#eae4ef'],
];

function dateKey(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map(part => String(part).padStart(2, '0')).join('-');
}

function tomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return dateKey(date);
}

function readVisits() {
  const raw = localStorage.getItem(storageKey);
  if (raw === null) return [{ id: 1, dept: '全科门诊', day: tomorrow(), time: '10:00' }];
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(v => v && Object.hasOwn(doctors, v.dept) &&
    /^\d{4}-\d{2}-\d{2}$/.test(v.day) && times.includes(v.time) && v.id != null)
    .sort((a, b) => (a.day + a.time).localeCompare(b.day + b.time));
}

function Pet() {
  return <div className="petMain">
    <div className="portrait"><img src="/companions.svg" alt="金毛犬头像" /></div>
    <div><h3>布丁 <small>♂</small></h3><p>金毛寻回犬 · 3 岁</p></div>
  </div>;
}

function Visit({ visit, cancel }) {
  const { day, dept, time } = visit;
  return <div className="appt">
    <div className="stamp">{Number(day.slice(5, 7))} 月<strong>{day.slice(8)}</strong></div>
    <div><b>{dept}</b><p>布丁 · {doctors[dept]}医生 · {time}</p></div>
    <span className="status">待就诊</span>
    {cancel && <button className="link" onClick={cancel}>取消预约</button>}
  </div>;
}

function SectionTitle({ title, caption, children }) {
  return <div className="sectionTitle"><h2>{title}</h2><small>{caption}</small>{children}</div>;
}

function Nav({ open, active }) {
  return [['就诊首页', 'home'], ['我的预约', 'calendar'], ['我的宠物', 'paw']].map(([name, icon]) =>
    <button key={name} className={'nav ' + (name === active ? 'active' : '')} onClick={() => open(name)}>
      <i><Icon name={icon} /></i>{name}
    </button>
  );
}

export default function Home() {
  const [visits, setVisits] = useState(null);
  const [date, setDate] = useState('');
  const [screen, setScreen] = useState('');
  const [department, setDepartment] = useState('全科门诊');
  const [cancelId, setCancelId] = useState(null);
  const [error, setError] = useState('');
  const dialog = useRef(null);

  useEffect(() => {
    setDate(new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' }));
    function load() {
      try { setVisits(readVisits()); } catch { setVisits([]); }
    }
    load();
    function onStorage(event) { if (!event.key || event.key === storageKey) load(); }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function open(name, dept = '全科门诊') {
    setError('');
    if (name === '就诊首页') {
      dialog.current.close();
      window.scrollTo(0, 0);
      return;
    }
    setDepartment(name === '疫苗接种' ? name : dept);
    setScreen(name === '疫苗接种' ? '预约挂号' : name);
    if (!dialog.current.open) dialog.current.showModal();
  }

  function save(next) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setVisits(next);
      open('我的预约');
    } catch {
      setError('当前浏览器无法保存预约，请检查存储设置后重试。');
    }
  }

  function book(event) {
    event.preventDefault();
    const { dept, day, time } = Object.fromEntries(new FormData(event.currentTarget));
    if (new Date(day + 'T' + time) <= new Date() || visits.some(v => v.day === day && v.time === time)) {
      setError('该时段已过或布丁已有预约，请选择其他时间。');
      return;
    }
    save([...visits, { id: crypto.randomUUID(), dept, day, time }]
      .sort((a, b) => (a.day + a.time).localeCompare(b.day + b.time)));
  }

  const nav = <Nav open={open} active={['我的预约', '我的宠物'].includes(screen) ? screen : '就诊首页'} />;
  return <>
    <header><div className="bar">
      <a href="/" className="brand" aria-label="爪爪动物医院首页"><b><Icon name="paw" /></b><span>爪爪动物医院<small>PAW HOUSE VET</small></span></a>
      <nav aria-label="主导航">{nav}</nav>
      <button className="account" aria-label="查看宠物档案" onClick={() => open('我的宠物')}><i><Icon name="user" /></i><span>宠物家长</span></button>
    </div></header>
    <main>
      <div className="welcome"><div><div className="eyebrow">CARE DASHBOARD</div><h1>就诊首页</h1></div><div className="date">{date}</div></div>
      <section className="hero"><div className="heroCopy">
        <div className="heroLabel"><Icon name="cross" /> PAW HOUSE CLINIC</div>
        <h2>用心照顾，<br />每一位毛孩子<span>。</span></h2>
        <button className="primary" onClick={() => open('预约挂号')}>预约挂号 <Icon name="arrow" /></button>
      </div><img src="/companions.svg" alt="戴着绿色项圈的金毛犬和黑白猫依偎在一起" /></section>
      <div className="grid"><div>
        <SectionTitle title="诊疗服务" caption="CLINIC SERVICES" />
        <div className="services">{services.map(([name, icon, background]) =>
          <button key={name} className="tile" style={{ background }} onClick={() => open(name)}><Icon name={icon} />{name}</button>
        )}</div>
        <SectionTitle title="我的预约" caption="APPOINTMENTS"><button className="link" onClick={() => open('我的预约')}>查看全部 ›</button></SectionTitle>
        {visits?.length ? <Visit visit={visits[0]} /> : <div className="appt empty">{visits ? '暂无待就诊预约' : '正在读取预约…'}</div>}
      </div><aside>
        <SectionTitle title="我的宠物" caption="MY PET" />
        <div className="petCard"><div className="petTop"><span>宠物健康档案</span><Icon name="paw" /></div><Pet />
          <div className="petFoot"><span>NO. PH–0028</span><button className="link" onClick={() => open('我的宠物')}>查看档案 ↗</button></div>
        </div>
      </aside></div>
    </main>
    <footer>{nav}</footer>
    <dialog ref={dialog} aria-labelledby="panel-title" onClose={() => setScreen('')}>
      <div className="dialogHead"><h2 id="panel-title">{screen === '我的宠物' ? '布丁的健康档案' : screen}</h2>
        <button className="close" aria-label="关闭" onClick={() => dialog.current.close()}>×</button>
      </div>
      <div className="body">
        {screen === '预约挂号' && <form onSubmit={book} onChange={() => setError('')}>
          <p>就诊宠物　<strong>布丁</strong></p>
          <label>科室与医生<select name="dept" defaultValue={department}>{Object.entries(doctors).map(([dept, doctor]) =>
            <option key={dept} value={dept}>{dept} · {doctor}医生</option>)}</select></label>
          <label>就诊日期<input type="date" required name="day" min={dateKey(new Date())} defaultValue={tomorrow()} /></label>
          <label>就诊时间<select name="time">{times.map(time => <option key={time}>{time}</option>)}</select></label>
          <p className="note">演示预约仅保存在当前浏览器。</p><button className="primary" disabled={!visits}>确认预约 <Icon name="arrow" /></button>
        </form>}
        {screen === '找医生' && Object.entries(doctors).map(([dept, doctor]) =>
          <div key={dept} className="doctor"><Icon name="doctor" /><div><b>{doctor} 医生</b><p>{dept}</p></div>
            <button className="link" onClick={() => open('预约挂号', dept)}>预约 ›</button></div>)}
        {screen === '我的预约' && (visits?.length ? visits.map(v =>
          <Visit key={v.id} visit={v} cancel={() => { setCancelId(v.id); open('取消这次预约？'); }} />) : <p>暂无预约</p>)}
        {screen === '取消这次预约？' && <><button className="primary" onClick={() => save(visits.filter(v => v.id !== cancelId))}>确认取消</button>
          <button onClick={() => open('我的预约')}>保留预约</button></>}
        {screen === '我的宠物' && <><Pet /><dl><dt>档案编号</dt><dd>PH–0028</dd><dt>性别</dt><dd>公</dd><dt>体重</dt><dd>28.5 kg</dd><dt>最近就诊</dt><dd>年度健康检查</dd></dl>
          <button className="primary" onClick={() => open('就诊记录')}>查看就诊记录</button></>}
        {screen === '就诊记录' && <div className="doctor"><Icon name="record" /><div><b>年度健康检查</b><p>布丁 · 全科门诊 · 林知夏医生</p><p>2026 年 9 月 12 日</p></div></div>}
        {error && <p role="alert">{error}</p>}
      </div>
    </dialog>
  </>;
}
