# README
## Running
```
PUBLIC_HOSPITAL_ID=1111 PUBLIC_HOSPITAL_NAME="First Government Hospital"  npx vite dev --port=5000
```

TODO
- Transfer data to his button/ Transfer data to doc
- Referral Viewable by dest doctor
- Speed test only data transfer
- Thoughts? Form
- Slides
- API docs


## How to present
0. Clear email
0. Clear data from 3 computers
1. Run central server   `./server`
4. Run central frontend `yarn dev3`
2. Run origin client    `ORIGIN=http://localhost:5000 node -r dotenv/config build`
3. Run origin frontend  `yarn dev1`
4. Run dest client      `./client`
4. Run dest frontend    `ORIGIN=http://localhost:5300 node -r dotenv/config build`

## At presentation
- NDID has, but not shown since AWS is slow
- Show create account
- Show referral