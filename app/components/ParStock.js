'use client';
import { useState } from 'react';

// Typical items in use per room (one king bed, two guests). Editable: every hotel sets its own standard.
const defaults = [
  ['Flat sheets', 2], ['Duvet covers', 1], ['Pillowcases', 4], ['Bath towels', 2],
  ['Hand towels', 2], ['Face towels', 2], ['Bath mats', 1], ['Bathrobes', 2],
];

const whole = (v) => Math.max(0, Math.floor(Number(v)) || 0);

export default function ParStock() {
  const [rooms, setRooms] = useState(50);
  const [par, setPar] = useState(3);
  const [perRoom, setPerRoom] = useState(defaults.map(([, n]) => n));

  return (
    <>
      <div className="form calc">
        <label htmlFor="par-rooms">Number of rooms</label>
        <input id="par-rooms" type="number" min="1" value={rooms} onChange={(e) => setRooms(whole(e.target.value))} />
        <label htmlFor="par-level">Par level</label>
        <select id="par-level" value={par} onChange={(e) => setPar(Number(e.target.value))}>
          {[3, 4, 5].map((n) => <option key={n} value={n}>{n} par</option>)}
        </select>
      </div>
      <table className="data calc-table">
        <thead><tr><th scope="col">Item</th><th scope="col">In use per room</th><th scope="col" className="num">Total to stock</th></tr></thead>
        <tbody>
          {defaults.map(([item], i) => (
            <tr key={item}>
              <th scope="row">{item}</th>
              <td>
                <input type="number" min="0" value={perRoom[i]} aria-label={`${item} per room`}
                  onChange={(e) => setPerRoom(perRoom.map((n, j) => (j === i ? whole(e.target.value) : n)))} />
              </td>
              <td className="num"><strong>{(perRoom[i] * rooms * par).toLocaleString('en-US')}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
