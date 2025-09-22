export const languages = {
  en: 'English',
  es: 'Español',
};

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export const ui = {
  en: {
    'header.title': 'Civitas',
    'header.theme.toggle.light': 'Switch to dark mode',
    'header.theme.toggle.dark': 'Switch to light mode',
    'form.title': 'Report an Issue',
    'form.description.label': 'Description',
    'form.description.placeholder': 'Describe the issue in detail...',
    'form.category.label': 'Category',
    'form.location.label': 'Location',
    'form.location.placeholder': 'e.g., "Corner of Main St & 1st Ave"',
    'form.submit.button': 'Submit Report',
    'form.submitting.button': 'Submitting...',
    'form.confirmation.message': 'Your request has been submitted.',
    'dashboard.title': 'My Reported Issues',
    'dashboard.empty': 'You have not reported any issues yet.',
    'issue.card.category': 'Category',
    'issue.card.ai.category': 'AI-Suggested Category',
    'issue.card.status': 'Status',
    'issue.card.reported.on': 'Reported on',
    'issue.card.status.submitted': 'Submitted',
  },
  es: {
    'header.title': 'Civitas',
    'header.theme.toggle.light': 'Cambiar a modo oscuro',
    'header.theme.toggle.dark': 'Cambiar a modo claro',
    'form.title': 'Reportar un Problema',
    'form.description.label': 'Descripción',
    'form.description.placeholder': 'Describa el problema en detalle...',
    'form.category.label': 'Categoría',
    'form.location.label': 'Ubicación',
    'form.location.placeholder': 'ej., "Esquina de Calle Principal y 1ra Avenida"',
    'form.submit.button': 'Enviar Reporte',
    'form.submitting.button': 'Enviando...',
    'form.confirmation.message': 'Su solicitud ha sido enviada.',
    'dashboard.title': 'Mis Problemas Reportados',
    'dashboard.empty': 'Aún no ha reportado ningún problema.',
    'issue.card.category': 'Categoría',
    'issue.card.ai.category': 'Categoría Sugerida por IA',
    'issue.card.status': 'Estado',
    'issue.card.reported.on': 'Reportado el',
    'issue.card.status.submitted': 'Enviado',
  },
} as const;
