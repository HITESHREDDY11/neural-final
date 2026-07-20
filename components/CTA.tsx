'use client';

import { useState, useId, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Mail, Phone, MapPin, Paperclip, X, 
  UploadCloud, MessageSquare, Cog, UserPlus, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Reveal, RevealItem } from './Reveal';

// ── Accessible floating-label input ────────────────────────────────────────

interface NeumorphicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function NeumorphicInput({
  label,
  value,
  onChange,
  type = 'text',
  required,
  error,
  id: propId,
  ...props
}: NeumorphicInputProps) {
  const uid = useId();
  const inputId = propId ?? uid;
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className="neumorphic-container">
      <input
        id={inputId}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className="neumorphic-input"
        {...props}
      />
      <motion.label
        htmlFor={inputId}
        initial={{ y: 0, x: 0, scale: 1 }}
        animate={{
          y: isActive ? -36 : 0,
          x: isActive ? -4 : 0,
          scale: isActive ? 0.85 : 1,
          color: isFocused
            ? 'hsl(var(--primary))'
            : isActive
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(255, 255, 255, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="absolute left-3 top-3 pointer-events-none text-[15px] font-medium origin-left"
      >
        {label}
      </motion.label>
      {error && (
        <p id={`${inputId}-error`} className="mt-1 flex items-center gap-1 text-xs text-red-400">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ── Accessible floating-label textarea ─────────────────────────────────────

interface NeumorphicTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

function NeumorphicTextarea({
  label,
  value,
  onChange,
  required,
  error,
  id: propId,
  ...props
}: NeumorphicTextareaProps) {
  const uid = useId();
  const inputId = propId ?? uid;
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className="neumorphic-container">
      <textarea
        id={inputId}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className="neumorphic-textarea"
        {...props}
      />
      <motion.label
        htmlFor={inputId}
        initial={{ y: 0, x: 0, scale: 1 }}
        animate={{
          y: isActive ? -36 : 0,
          x: isActive ? -4 : 0,
          scale: isActive ? 0.85 : 1,
          color: isFocused
            ? 'hsl(var(--primary))'
            : isActive
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(255, 255, 255, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="absolute left-3 top-3.5 pointer-events-none text-[15px] font-medium origin-left"
      >
        {label}
      </motion.label>
      {error && (
        <p id={`${inputId}-error`} className="mt-1 flex items-center gap-1 text-xs text-red-400">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ── File Attachment Component ───────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(file: File) {
  const type = file.type;
  if (type.startsWith('image/')) return '🖼️';
  if (type === 'application/pdf') return '📄';
  if (type.includes('word') || type.includes('document')) return '📝';
  if (type.includes('sheet') || type.includes('excel')) return '📊';
  if (type.includes('zip') || type.includes('rar')) return '🗜️';
  return '📎';
}

interface AttachmentZoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

function AttachmentZone({ files, onFilesChange }: AttachmentZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles = Array.from(incoming).filter(
      (f) => !files.some((existing) => existing.name === f.name && existing.size === f.size)
    );
    onFilesChange([...files, ...newFiles]);
  }, [files, onFilesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-2 space-y-3">
      {/* Drop Zone */}
      <motion.div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        animate={{
          borderColor: isDragging ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.1)',
          backgroundColor: isDragging ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.02)',
        }}
        transition={{ duration: 0.2 }}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-5 transition-all"
        role="button"
        aria-label="Upload attachments"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
      >
        <motion.div
          animate={{ scale: isDragging ? 1.15 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <UploadCloud className="h-5 w-5" />
        </motion.div>
        <div className="text-center">
          <p className="text-sm font-medium text-white/70">
            {isDragging ? 'Drop files here…' : 'Drag & drop or click to attach files'}
          </p>
          <p className="mt-0.5 text-xs text-white/35">PDF, DOCX, images, ZIP — up to 25 MB each</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.zip,.rar,.txt"
        />
      </motion.div>

      {/* File List */}
      <AnimatePresence initial={false}>
        {files.map((file, index) => (
          <motion.div
            key={`${file.name}-${file.size}`}
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 overflow-hidden rounded-lg border border-white/10 bg-white/5 px-3 py-2"
          >
            <span className="text-lg leading-none">{getFileIcon(file)}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white/80">{file.name}</p>
              <p className="text-[10px] text-white/35">{formatFileSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={() => removeFile(index)}
              aria-label={`Remove ${file.name}`}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-white/30 transition-colors hover:bg-red-500/20 hover:text-red-400"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {files.length > 0 && (
        <p className="text-right text-[11px] text-white/30">
          {files.length} file{files.length > 1 ? 's' : ''} attached
        </p>
      )}
    </div>
  );
}

// ── Validation helpers ──────────────────────────────────────────────────────

function validate(name: string, email: string, message: string) {
  const errors: { name?: string; email?: string; message?: string } = {};
  if (!name.trim()) errors.name = 'Name is required';
  if (!email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address';
  if (!message.trim()) errors.message = 'Message is required';
  else if (message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
  return errors;
}

// ── Main component ──────────────────────────────────────────────────────────

const WEB3FORMS_KEY = '94d2ff52-9fc0-4e88-ba3c-bb3a20c35eaa';

export default function CTA() {
  const [inquiryType, setInquiryType] = useState<'general' | 'dealer' | 'custom'>('general');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [customProduct, setCustomProduct] = useState('');
  const [territory, setTerritory] = useState('');
  const [yearsOp, setYearsOp] = useState('');
  const [message, setMessage] = useState('');

  const [attachments, setAttachments] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitError, setSubmitError] = useState('');

  const handleReset = () => {
    setSubmitted(false);
    setTicketId('');
    setSubmitError('');
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setCustomProduct('');
    setTerritory('');
    setYearsOp('');
    setMessage('');
    setAttachments([]);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    const errs = validate(name, email, message);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitError('');
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_KEY);
      formData.append('inquiry_type', inquiryType);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('company', company);
      
      if (inquiryType === 'custom') {
        formData.append('custom_product_name', customProduct);
      } else if (inquiryType === 'dealer') {
        formData.append('operational_territory', territory);
        formData.append('years_of_operations', yearsOp);
      }

      formData.append('message', message);

      const ticket = `NIA-${Math.floor(10000 + Math.random() * 90000)}`;
      formData.append('ticket_id', ticket);
      formData.append('subject', `New Home Enquiry [${inquiryType.toUpperCase()}] — Ticket: ${ticket}`);

      // Attach files if any
      attachments.forEach((file) => {
        formData.append('attachment[]', file, file.name);
      });

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setTicketId(ticket);
        setSubmitted(true);
      } else {
        setSubmitError(data.message ?? 'Something went wrong. Please email us directly.');
      }
    } catch {
      setSubmitError('Could not send message. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl shadow-primary/5">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: 'radial-gradient(60% 80% at 80% 0%, rgba(59,130,246,0.15), transparent 60%)' }}
          />
          <div className="pointer-events-none absolute inset-0 bp-grid-fine opacity-30" />

          <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-4">
            {/* Left — contact info */}
            <div className="lg:col-span-5 flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <RevealItem>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-primary/40" />
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Ready to Automate?</p>
                </div>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
                  Let&apos;s Build Something Remarkable
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Talk to our team about custom automation solutions tailored for your enterprise.
                  We respond within 24 hours.
                </p>
              </RevealItem>
              <RevealItem>
                <div className="mt-10 space-y-4">
                  <a
                    href="mailto:sales@neuralindustrialautmation.in"
                    className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-4 w-4" />
                    </span>
                    sales@neuralindustrialautmation.in
                  </a>
                  <a
                    href="tel:+918977724519"
                    className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Phone className="h-4 w-4" />
                    </span>
                    +91 89777 24519
                  </a>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span>
                      2-1/126, N NCL Ln, Ruby Block, Satyam Enclave,
                      <br />
                      Kompally, Hyderabad, Telangana 500014
                    </span>
                  </div>
                </div>
              </RevealItem>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-7 flex items-center p-6 sm:p-10 lg:p-12">
              <RevealItem className="w-full">
                <div
                  className="w-full rounded-2xl border border-border/60 bg-secondary/95 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
                  style={{
                    boxShadow:
                      '0 20px 40px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {/* Form header selector tabs */}
                  <div className="flex border-b border-border/60 pb-5 mb-5 gap-2 flex-wrap">
                    <button
                      onClick={() => { setInquiryType('general'); handleReset(); }}
                      className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all border ${
                        inquiryType === 'general'
                          ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                          : 'bg-secondary/20 text-muted-foreground border-border/80 hover:bg-secondary/40'
                      }`}
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span>General</span>
                    </button>
                    <button
                      onClick={() => { setInquiryType('custom'); handleReset(); }}
                      className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all border ${
                        inquiryType === 'custom'
                          ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                          : 'bg-secondary/20 text-muted-foreground border-border/80 hover:bg-secondary/40'
                      }`}
                    >
                      <Cog className="h-3 w-3" />
                      <span>Custom Spec</span>
                    </button>
                    <button
                      onClick={() => { setInquiryType('dealer'); handleReset(); }}
                      className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all border ${
                        inquiryType === 'dealer'
                          ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                          : 'bg-secondary/20 text-muted-foreground border-border/80 hover:bg-secondary/40'
                      }`}
                    >
                      <UserPlus className="h-3 w-3" />
                      <span>Dealer</span>
                    </button>
                  </div>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center flex flex-col items-center py-12"
                    >
                      <CheckCircle2 className="h-12 w-12 text-primary animate-pulse" />
                      <h3 className="mt-5 text-lg font-bold text-white">Enquiry Dispatched Successfully</h3>
                      <p className="mt-2 text-xs text-muted-foreground max-w-xs leading-relaxed">
                        Our engineering division has created validation ticket reference <code className="text-primary font-mono font-bold">{ticketId}</code>. A team member will reply shortly.
                      </p>
                      <button
                        onClick={handleReset}
                        className="mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-secondary px-5 text-xs font-semibold text-foreground hover:bg-secondary/80 border border-border"
                      >
                        Submit Another Request
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <NeumorphicInput
                          label="Full Name"
                          type="text"
                          name="name"
                          required
                          value={name}
                          onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
                          error={errors.name}
                        />
                        <NeumorphicInput
                          label="Work Email"
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                          error={errors.email}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="neumorphic-container">
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Corporate Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="neumorphic-container">
                          <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="neumorphic-input"
                          />
                        </div>
                      </div>

                      {inquiryType === 'custom' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="neumorphic-container"
                        >
                          <input
                            required
                            type="text"
                            name="custom_product_name"
                            placeholder="Required Custom Product Name"
                            value={customProduct}
                            onChange={(e) => setCustomProduct(e.target.value)}
                            className="neumorphic-input"
                          />
                        </motion.div>
                      )}

                      {inquiryType === 'dealer' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="grid gap-4 sm:grid-cols-2"
                        >
                          <div className="neumorphic-container">
                            <input
                              required
                              type="text"
                              name="operational_territory"
                              placeholder="Operational Territory"
                              value={territory}
                              onChange={(e) => setTerritory(e.target.value)}
                              className="neumorphic-input"
                            />
                          </div>
                          <div className="neumorphic-container">
                            <input
                              required
                              type="number"
                              min="0"
                              name="years_of_operations"
                              placeholder="Years of Operations"
                              value={yearsOp}
                              onChange={(e) => setYearsOp(e.target.value)}
                              className="neumorphic-input"
                            />
                          </div>
                        </motion.div>
                      )}

                      <NeumorphicTextarea
                        label="Message"
                        name="message"
                        required
                        value={message}
                        onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: undefined })); }}
                        error={errors.message}
                      />

                      {/* ── Attachments ─────────────────────────────────── */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Paperclip className="h-3.5 w-3.5 text-primary/70" />
                          <p className="text-[11px] font-medium text-white/50 uppercase tracking-wider">
                            Attachments <span className="normal-case text-white/25 font-normal">(optional)</span>
                          </p>
                        </div>
                        <AttachmentZone files={attachments} onFilesChange={setAttachments} />
                      </div>

                      {submitError && (
                        <p className="flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {submitError}
                        </p>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={submitting}
                        className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <AnimatePresence mode="wait">
                          {submitting ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -15 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center gap-2"
                            >
                              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              <span>Sending…</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="idle"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -15 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center gap-2"
                            >
                              <span>Send Message</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </form>
                  )}
                </div>
              </RevealItem>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
