# Lab de Microservicios en AWS ECS Fargate

Serie de laboratorios para aprender a desplegar microservicios en AWS, de forma incremental y didáctica.

📝 **Nota completa en el blog:** [LINK_PENDIENTE]

---

## Arquitectura

```
LAB 1 ✅ → Local con Docker Compose (red bridge, sin nube)
LAB 2 ✅ → Bare Fargate en AWS (IPs públicas directas, sin load balancer)
LAB 3    → Con ALB (Application Load Balancer)
LAB 4    → Con API Gateway + NLB
```

---

## LAB 2 — Bare Fargate

Despliegue mínimo en ECS Fargate. Cada microservicio expone una IP pública directamente, sin capa intermedia.

```
Internet
    ├── http://<IP-frontend>        → nginx sirviendo el frontend (puerto 80)
    ├── http://<IP-usuarios>:3000   → Node.js/Express GET /users
    └── http://<IP-productos>:3001  → Node.js/Express GET /products
```

### Servicios

| Servicio | Imagen | Puerto |
|---|---|---|
| frontend | `mslab/frontend` | 80 |
| usuarios | `mslab/usuarios` | 3000 |
| productos | `mslab/productos` | 3001 |

### Recursos AWS creados

| Recurso | Nombre |
|---|---|
| ECR repos | `mslab/frontend`, `mslab/usuarios`, `mslab/productos` |
| ECS Cluster | `mslab-cluster` |
| Task Definitions | `mslab-frontend`, `mslab-usuarios`, `mslab-productos` |
| Services | `mslab-svc-frontend`, `mslab-svc-usuarios`, `mslab-svc-productos` |
| Security Groups | `mslab-sg-frontend`, `mslab-sg-usuarios`, `mslab-sg-productos` |

### Comandos clave

**Autenticación ECR:**
```bash
aws sso login --profile AdministratorAccess-213026892524
aws ecr get-login-password --region us-east-1 --profile AdministratorAccess-213026892524 | \
  docker login --username AWS --password-stdin 213026892524.dkr.ecr.us-east-1.amazonaws.com
```

**Build y push de imágenes (Mac Apple Silicon → AMD64):**
```bash
docker build --platform linux/amd64 -t mslab/<servicio> .
docker tag mslab/<servicio>:latest 213026892524.dkr.ecr.us-east-1.amazonaws.com/mslab/<servicio>:latest
docker push 213026892524.dkr.ecr.us-east-1.amazonaws.com/mslab/<servicio>:latest
```

### Errores encontrados y soluciones

| Error | Causa | Solución |
|---|---|---|
| `exec format error` | Imagen ARM buildeada en Mac M1, Fargate espera AMD64 | Agregar `--platform linux/amd64` al build |
| `not found` al jalar imagen | Task Definition apuntaba a digest SHA256 de imagen vieja | Usar `:latest` en el Image URI, no el digest |
| `iam:GetRole` denegado | El rol SSO no tiene permisos IAM | Crear `ecsTaskExecutionRole` manualmente en IAM |

### Limitaciones (resueltas en LAB 2)

- Las IPs públicas son efímeras — cambian con cada deployment o reinicio de task
- Las URLs están hardcodeadas en el frontend
- Los servicios están expuestos directamente a internet sin capa intermedia
- Si un task se reinicia solo, el sistema se rompe hasta actualizar el frontend

---

## Costos aproximados

| Recurso | Costo |
|---|---|
| 3 tasks Fargate (0.25 vCPU, 0.5GB) corriendo 24/7 | ~$0.87 USD/día |
| Imágenes en ECR (~330MB) | ~$0.03 USD/mes |
| Task Definitions, Cluster (sin tasks) | $0 |

> Eliminar los Services cuando no se estén usando para evitar costos innecesarios.
