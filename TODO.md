# TODO

- [x] Add `REDIS_ENABLED` env flag in `server/src/config/env.ts`
- [x] Load BullMQ worker conditionally in `server/index.ts` based on `REDIS_ENABLED`
- [x] Make queue path safe when Redis is disabled in `server/src/queue/contact.queue.ts` (no connection attempts)
- [x] Run/start server check to confirm `ECONNREFUSED 127.0.0.1:6379` spam is gone when Redis is disabled

## Fallback sem Redis
- [x] Implementar fallback no controller para envio direto quando `REDIS_ENABLED=false`
- [x] Ajustar logs/mensagens para modo sem Redis
- [ ] Retestar endpoint de contato no modo sem Redis
- [x] Adicionar `MAIL_ENABLED` para permitir modo local sem SMTP
