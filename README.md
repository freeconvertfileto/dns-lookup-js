# DNS Lookup

Look up DNS records for any domain by record type — A, AAAA, MX, TXT, CNAME, NS, SOA — via a backend API, entirely from the browser.

**Live Demo:** https://file-converter-free.com/en/network-tools/dns-lookup-online

## How It Works

The domain input is normalized by stripping `https?://` and any path component before the query is sent. The lookup calls `https://api.file-converter-free.com/api/dns?domain=...&type=...` via `fetch`, sending the selected record type as a query parameter. The response JSON may contain `records` or `results` as either a flat array or a keyed object; the renderer handles both shapes by checking `Array.isArray` and iterating object keys with `Object.keys`. Each record group is preceded by a section title matching the record type key, and individual record objects are expanded with `Object.keys` into key-value rows. Enter key triggers the same lookup function as the button click.

## Features

- Domain normalization: strips protocol and path before query
- Record type selector (A, AAAA, MX, TXT, CNAME, NS, SOA, and more)
- Handles both array and keyed-object response shapes
- Nested object records expanded to key-value rows
- Enter key shortcut
- Loading indicator and disabled button during request

## Browser APIs Used

- Fetch API

## Code Structure

| File | Description |
|------|-------------|
| `dns-lookup.js` | Domain normalization, `fetch` to `/api/dns`, array/object response renderer with `Object.keys`, section title grouping, Enter key handler |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#dnsDomain` | Domain name input |
| `#dnsType` | Record type selector |
| `#dnsLookup` | Lookup button |
| `#dnsResults` | Results container (hidden until lookup) |
| `#dnsLoading` | Loading indicator |
| `#dnsData` | Rendered DNS records |

## License

MIT
