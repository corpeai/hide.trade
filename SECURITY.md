# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in Hide Protocol, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email security@hide.trade with details
3. Include steps to reproduce if possible
4. Allow 48 hours for initial response

## Security Best Practices

### For Users

- Never share your private keys
- Always verify transaction details before signing
- Use hardware wallets for large amounts
- Keep your software updated
- Be cautious of phishing attempts

### For Developers

- All sensitive operations must happen client-side
- Never log private keys or sensitive data
- Use environment variables for configuration
- Implement proper input validation
- Follow Solana security best practices

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Known Limitations

- This is demo software for educational purposes
- Smart contract is not yet audited
- Use testnet for development

## Security Features

- Client-side key generation
- Zero-knowledge proof integration
- No server-side key storage
- Open source and auditable code
