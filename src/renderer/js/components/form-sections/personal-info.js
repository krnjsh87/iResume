// Personal Information Form Section

const PersonalInfoSection = {
  data: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    photoData: null,
    dateOfBirth: '',
    nationality: '',
    gender: '',
    maritalStatus: ''
  },

  render(countryConfig) {
    const fields = countryConfig.fields;

    return `
      <div class="form-section" id="section-personal" data-section="personal">
        <div class="section-header">
          <h3><span class="section-icon">👤</span> Personal Information</h3>
          <span class="collapse-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label required">Full Name</label>
              <input type="text" class="form-input" id="fullName" value="${this.data.fullName || ''}">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label required">Email</label>
              <input type="email" class="form-input" id="email" value="${this.data.email || ''}">
            </div>
            <div class="form-group">
              <label class="form-label required">Phone</label>
              <input type="tel" class="form-input" id="phone" value="${this.data.phone || ''}">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Address</label>
              <input type="text" class="form-input" id="address" value="${this.data.address || ''}">
            </div>
            <div class="form-group">
              <label class="form-label">LinkedIn</label>
              <input type="text" class="form-input" id="linkedin" value="${this.data.linkedin || ''}">
            </div>
          </div>
          
          ${fields.photo ? `
            <div class="form-group">
              <label class="form-label">Photo ${fields.photo ? '(Required for ' + countryConfig.code + ')' : ''}</label>
              <div class="file-upload-container">
                <label class="file-upload-label" for="photo">
                  <span>📁</span>
                  <span>Choose Photo</span>
                </label>
                <input type="file" class="file-upload-input" id="photo" accept="image/*">
              </div>
              ${this.data.photoData ? `<div class="file-preview"><img src="${this.data.photoData}" alt="Photo preview"></div>` : ''}
            </div>
          ` : ''}
          
          <div class="form-row">
            ${fields.dateOfBirth ? `
              <div class="form-group">
                <label class="form-label">Date of Birth</label>
                <input type="date" class="form-input" id="dateOfBirth" value="${this.data.dateOfBirth || ''}">
              </div>
            ` : ''}
            ${fields.nationality ? `
              <div class="form-group">
                <label class="form-label">Nationality</label>
                <input type="text" class="form-input" id="nationality" value="${this.data.nationality || ''}">
              </div>
            ` : ''}
          </div>
          
          <div class="form-row">
            ${fields.gender ? `
              <div class="form-group">
                <label class="form-label">Gender</label>
                <select class="form-input" id="gender">
                  <option value="">Select</option>
                  <option value="Male" ${this.data.gender === 'Male' ? 'selected' : ''}>Male</option>
                  <option value="Female" ${this.data.gender === 'Female' ? 'selected' : ''}>Female</option>
                  <option value="Other" ${this.data.gender === 'Other' ? 'selected' : ''}>Other</option>
                  <option value="Prefer not to say" ${this.data.gender === 'Prefer not to say' ? 'selected' : ''}>Prefer not to say</option>
                </select>
              </div>
            ` : ''}
            ${fields.maritalStatus ? `
              <div class="form-group">
                <label class="form-label">Marital Status</label>
                <select class="form-input" id="maritalStatus">
                  <option value="">Select</option>
                  <option value="Single" ${this.data.maritalStatus === 'Single' ? 'selected' : ''}>Single</option>
                  <option value="Married" ${this.data.maritalStatus === 'Married' ? 'selected' : ''}>Married</option>
                  <option value="Divorced" ${this.data.maritalStatus === 'Divorced' ? 'selected' : ''}>Divorced</option>
                  <option value="Widowed" ${this.data.maritalStatus === 'Widowed' ? 'selected' : ''}>Widowed</option>
                </select>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },

  attachEventListeners() {
    const fields = ['fullName', 'email', 'phone', 'address', 'linkedin', 'dateOfBirth', 'nationality', 'gender', 'maritalStatus'];
    fields.forEach(field => {
      const element = document.getElementById(field);
      if (element) {
        element.addEventListener('input', () => {
          this.data[field] = element.value;
          window.appInstance?.updatePreview();
        });
      }
    });

    // Photo upload
    const photoInput = document.getElementById('photo');
    if (photoInput) {
      photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.data.photoData = e.target.result;
            window.appInstance?.updatePreview();
            window.appInstance?.renderForm();
          };
          reader.readAsDataURL(file);
        }
      });
    }
  },

  getData() {
    return this.data;
  },

  setData(data) {
    this.data = { ...this.data, ...data };
  },

  clear() {
    this.data = {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      photoData: null,
      dateOfBirth: '',
      nationality: '',
      gender: '',
      maritalStatus: ''
    };
  }
};
