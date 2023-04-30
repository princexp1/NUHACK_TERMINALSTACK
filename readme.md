# Alpine

Not your average protocol exchanger!

## Summary
Alpine works directly on ***TCP*** sockets instead just listening to HTTP requests,
Alpine Supports SOAP requests from HTTP(production), SMTP(experimental), FTP (experimental).

## Installation
### 1.
```bash
git clone https://github.com/Mantra27/team-terminal-stack-hacknuthon.git
```
### 2.
```bash
cd team-terminal-stack-hacknuthon
```
### 3.
```bash
npm install 
```

### 4.
```bash
ts-node Alpine/src/npm/listener.ts  -p {destination_port} -h {destination_host} -s {receiver_protocol}
```
## Exmaple:
```bash
ts-node Alpine/src/npm/listener.ts  -p 8080 -h localhost -s soap
```

## Contributing
Team Terminal Stack
- Mantra Gohil (Adani University)
- Khush Patel (Adani University)
- Prince Viramgama (Nirma)

## License

[MIT](https://choosealicense.com/licenses/mit/)
