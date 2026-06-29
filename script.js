/* ========== পার্টিকেল তৈরি ========== */
(function createParticles() {
  var container = document.getElementById('ptc');
  if (!container) return;
  for (var i = 0; i < 30; i++) {
    var p = document.createElement('div');
    p.className = 'pt';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.width = (1 + Math.random() * 2) + 'px';
    p.style.height = p.style.width;
    container.appendChild(p);
  }
})();

/* ========== হেডার স্ক্রল ইফেক্ট ========== */
var header = document.getElementById('hd');
var lastScroll = 0;
var mqSection = document.querySelector('.mq-s');

window.addEventListener('scroll', function() {
  var st = window.pageYOffset;
  if (st > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  /* মার্কি হাইড/শো */
  if (mqSection) {
    if (st > lastScroll && st > 200) {
      mqSection.classList.add('hide');
    } else {
      mqSection.classList.remove('hide');
    }
  }
  lastScroll = st;
  /* ব্যাক টু টপ */
  var btt = document.querySelector('.btt');
  if (btt) {
    if (st > 500) {
      btt.classList.add('vis');
    } else {
      btt.classList.remove('vis');
    }
  }
  /* রিভিল অ্যানিমেশন */
  revealElements();
});

/* ব্যাক টু টপ ক্লিক */
document.addEventListener('DOMContentLoaded', function() {
  var btt = document.querySelector('.btt');
  if (btt) {
    btt.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

/* ========== মোবাইল মেনু ========== */
var mobToggle = document.querySelector('.mob-t');
var mobMenu = document.querySelector('.mob-m');

if (mobToggle && mobMenu) {
  mobToggle.addEventListener('click', function() {
    this.classList.toggle('a');
    mobMenu.classList.toggle('open');
    document.body.style.overflow = mobMenu.classList.contains('open') ? 'hidden' : '';
  });
  /* মোবাইল মেনুর লিংকে ক্লিক করলে বন্ধ হবে */
  mobMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobToggle.classList.remove('a');
      mobMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ========== হিরো স্লাইডার ========== */
var slides = document.querySelectorAll('.h-anim-slide');
var dots = document.querySelectorAll('.s-dot');
var currentSlide = 0;
var slideInterval = null;

function showSlide(index) {
  slides.forEach(function(s) { s.classList.remove('active'); });
  dots.forEach(function(d) { d.classList.remove('active'); });
  currentSlide = ((index % slides.length) + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function startSlider() {
  slideInterval = setInterval(function() {
    showSlide(currentSlide + 1);
  }, 5000);
}

function resetSlider() {
  clearInterval(slideInterval);
  startSlider();
}

dots.forEach(function(dot, i) {
  dot.addEventListener('click', function() {
    showSlide(i);
    resetSlider();
  });
});

var prevBtn = document.querySelector('.s-arr.prev');
var nextBtn = document.querySelector('.s-arr.next');

if (prevBtn) {
  prevBtn.addEventListener('click', function() {
    showSlide(currentSlide - 1);
    resetSlider();
  });
}
if (nextBtn) {
  nextBtn.addEventListener('click', function() {
    showSlide(currentSlide + 1);
    resetSlider();
  });
}

/* প্রথম স্লাইড দেখাও */
if (slides.length > 0) {
  showSlide(0);
  startSlider();
}

/* ========== ভয়েস ফর্ম অ্যানিমেশন ========== */
var voiceRows = document.querySelectorAll('.v-row');
if (voiceRows.length > 0) {
  var voiceObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        voiceRows.forEach(function(row, i) {
          setTimeout(function() {
            row.classList.add('filled');
          }, i * 700);
        });
        voiceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  var vForm = document.querySelector('.v-form');
  if (vForm) voiceObserver.observe(vForm);
}

/* ========== সার্ভিস মোডাল ========== */
var serviceData = {
  sonod: {
    icon: 'fas fa-file-certificate',
    iconBg: 'linear-gradient(135deg,#c6f91f,#7dd328)',
    title: 'ডিজিটাল সনদপত্র',
    desc: 'জন্ম সনদ, মৃত্যু সনদ, ওয়ারিশ সনদ, চেয়ারম্যান সনদ, নাগরিকত্ব সনদসহ সকল ধরনের প্রয়োজনীয় সনদপত্র এখন আপনার হাতের মুঠোয়। কোনো দালাল বা মধ্যস্বত্বভোগী ছাড়াই সরাসরি ইউনিয়ন পরিষদ থেকে আবেদন করুন এবং দ্রুততম সময়ে ডিজিটাল সনদ গ্রহণ করুন।',
    tags: ['জন্ম সনদ', 'মৃত্যু সনদ', 'ওয়ারিশ সনদ', 'চেয়ারম্যান সনদ', 'নাগরিকত্ব সনদ', 'চরিত্র সনদ', 'অস্থায়ী সনদ'],
    link: 'https://v3.sonod.com.bd/auth/citizen-register',
    linkText: 'সনদের জন্য আবেদন করুন'
  },
  tax: {
    icon: 'fas fa-landmark',
    iconBg: 'linear-gradient(135deg,#f59e0b,#d97706)',
    title: 'হোল্ডিং ট্যাক্স পরিশোধ',
    desc: 'ডিজিটাল পদ্ধতিতে সহজেই হোল্ডিং ট্যাক্স পরিশোধ করুন। বিকাশ, নগদ, রকেট, ক্রেডিট/ডেবিট কার্ডসহ বিভিন্ন পেমেন্ট মাধ্যমে ট্যাক্স পরিশোধ করা যায়। পরিশোধের সাথে সাথেই ডিজিটাল রিসিট পাবেন।',
    tags: ['বিকাশ', 'নগদ', 'রকেট', 'কার্ড পেমেন্ট', 'ডিজিটাল রিসিট', 'অনলাইন পেমেন্ট'],
    link: 'https://v3.sonod.com.bd/tax-payment',
    linkText: 'ট্যাক্স পরিশোধ করুন'
  },
  ocr: {
    icon: 'fas fa-id-card',
    iconBg: 'linear-gradient(135deg,#1a56db,#3b82f6)',
    title: 'OCR স্বয়ংক্রিয় ফর্ম পূরণ',
    desc: 'আপনার জাতীয় পরিচয়পত্র (NID) বা জন্ম নিবন্ধন সনদের ছবি তুললেই OCR প্রযুক্তি স্বয়ংক্রিয়ভাবে তথ্য সংগ্রহ করে ফর্ম পূরণ করে দেবে। হাতে করে টাইপ করার কোনো ঝামেলা নেই।',
    tags: ['NID স্ক্যান', 'জন্ম নিবন্ধন স্ক্যান', 'স্বয়ংক্রিয় তথ্য সংগ্রহ', 'টাইপিং মুক্ত', 'AI প্রযুক্তি'],
    link: 'https://v3.sonod.com.bd/auth/citizen-register',
    linkText: 'OCR ব্যবহার করুন'
  },
  voice: {
    icon: 'fas fa-microphone',
    iconBg: 'linear-gradient(135deg,#8b5cf6,#a78bfa)',
    title: 'ভয়েস ইনপুট',
    desc: 'বাংলায় কথা বলেই ফর্ম পূরণ করুন! আমাদের ভয়েস রিকগনিশন প্রযুক্তি আপনার কথা বুঝে স্বয়ংক্রিয়ভাবে সঠিক ফিল্ডে তথ্য বসিয়ে দেবে। যাদের টাইপিংয়ে অসুবিধা তাদের জন্য এটি অত্যন্ত কার্যকরী।',
    tags: ['বাংলা ভয়েস', 'স্বয়ংক্রিয় ফর্ম', 'টাইপিং মুক্ত', 'প্রবীণ বান্ধব', 'স্পিচ টু টেক্সট'],
    link: 'https://v3.sonod.com.bd/auth/citizen-register',
    linkText: 'ভয়েস ইনপুট ব্যবহার করুন'
  },
  vgf: {
    icon: 'fas fa-wheat-awn',
    iconBg: 'linear-gradient(135deg,#c6f91f,#7dd328)',
    title: 'VGF চাল বিতরণ ব্যবস্থাপনা',
    desc: 'ভালোন্তরীয় খাদ্য কর্মসূচি (VGF) এর চাল বিতরণ সম্পূর্ণ ডিজিটাল পদ্ধতিতে পরিচালনা করুন। সুবিধাভোগীদের তালিকা তৈরি, যাচাই-বাছাই, বিতরণ এবং রিপোর্টিং — সবকিছু এক প্ল্যাটফর্মে। EID কার্ডের মাধ্যমে স্বয়ংক্রিয়ভাবে পরিচয় যাচাই হবে।',
    tags: ['EID কার্ড যাচাই', 'সুবিধাভোগী তালিকা', 'বিতরণ রিপোর্ট', 'ডিজিটাল হিসাব', 'পারদর্শিতা'],
    link: 'https://v3.sonod.com.bd/vgf',
    linkText: 'VGF ব্যবস্থাপনায় যান'
  },
  app: {
    icon: 'fas fa-mobile-screen-button',
    iconBg: 'linear-gradient(135deg,#06d6a0,#059669)',
    title: 'মোবাইল অ্যাপ',
    desc: 'সনদের সকল সেবা এখন আপনার মোবাইলে। অ্যান্ড্রয়েড অ্যাপ ডাউনলোড করে ঘরে বসেই সনদ আবেদন, ট্যাক্স পরিশোধ, আবেদনের অবস্থা ট্র্যাক করুন। পুশ নোটিফিকেশনের মাধ্যমে আবেদনের আপডেট তাৎক্ষণিক জানুন।',
    tags: ['অ্যান্ড্রয়েড অ্যাপ', 'পুশ নোটিফিকেশন', 'অফলাইন সাপোর্ট', 'বাংলা ইন্টারফেস', 'দ্রুত লোড'],
    link: 'https://play.google.com/store/apps/details?id=app.bdfast.sonoddorkar',
    linkText: 'অ্যাপ ডাউনলোড করুন'
  },
  nid: {
    icon: 'fas fa-fingerprint',
    iconBg: 'linear-gradient(135deg,#ef4444,#f97316)',
    title: 'NID যাচাইকরণ',
    desc: 'জাতীয় পরিচয়পত্রের তথ্য দিয়ে সহজেই পরিচয় যাচাই করুন। নির্বাচন কমিশনের ডাটাবেসের সাথে সংযোগ করে নাম, পিতার নাম, মাতার নাম, জন্ম তারিখ যাচাই হবে মুহূর্তেই।',
    tags: ['NID ভেরিফিকেশন', 'EC ডাটাবেস', 'তাৎক্ষণিক যাচাই', 'নির্ভুল তথ্য'],
    link: 'https://v3.sonod.com.bd/nid-verify',
    linkText: 'NID যাচাই করুন'
  },
  complaint: {
    icon: 'fas fa-bullhorn',
    iconBg: 'linear-gradient(135deg,#ec4899,#f43f5e)',
    title: 'অভিযোগ ব্যবস্থাপনা',
    desc: 'ইউনিয়ন পরিষদে সকল ধরনের অভিযোগ ডিজিটালভাবে দায়ের করুন এবং ট্র্যাক করুন। অভিযোগের অগ্রগতি, দায়িত্বপ্রাপ্ত কর্মকর্তা, সমাধানের সময়সীমা — সবকিছু স্বচ্ছভাবে দেখুন।',
    tags: ['ডিজিটাল অভিযোগ', 'ট্র্যাকিং', 'স্বচ্ছতা', 'দ্রুত সমাধান', 'এসএমএস নোটিফিকেশন'],
    link: 'https://v3.sonod.com.bd/complaint',
    linkText: 'অভিযোগ দায়ের করুন'
  }
};

function openServiceModal(key) {
  var data = serviceData[key];
  if (!data) return;
  var modal = document.getElementById('serviceModal');
  if (!modal) return;
  modal.querySelector('.sIcon').style.background = data.iconBg;
  modal.querySelector('.sIcon').innerHTML = '<i class="' + data.icon + '"></i>';
  modal.querySelector('.sm-md h3').textContent = data.title;
  modal.querySelector('.sDesc').textContent = data.desc;

  var tagsHtml = '';
  data.tags.forEach(function(tag) {
    tagsHtml += '<span class="sTag"><i class="fas fa-check"></i>' + tag + '</span>';
  });
  modal.querySelector('.sTags').innerHTML = tagsHtml;
  modal.querySelector('.sLink').href = data.link;
  modal.querySelector('.sLink').innerHTML = data.linkText + ' <i class="fas fa-arrow-right"></i>';

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  var modal = document.getElementById('serviceModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* মোডাল বন্ধ বাটন */
document.addEventListener('DOMContentLoaded', function() {
  var closeBtn = document.querySelector('.sm-cl');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeServiceModal);
  }
  var overlay = document.getElementById('serviceModal');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeServiceModal();
    });
  }
});

/* ========== কন্টাক্ট পেজ ========== */
function openContactPage() {
  var cp = document.getElementById('contactPage');
  if (cp) {
    cp.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeContactPage() {
  var cp = document.getElementById('contactPage');
  if (cp) {
    cp.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ========== লিগাল পেজ ========== */
function openLegalPage(type) {
  var ov = document.getElementById('legalOverlay');
  var md = ov ? ov.querySelector('.legal-md') : null;
  if (!ov || !md) return;

  var content = {
    privacy: {
      title: 'গোপনীয়তা নীতি',
      updated: 'সর্বশেষ হালনাগাদ: জানুয়ারি ২০২৫',
      sections: [
        { heading: 'তথ্য সংগ্রহ', text: 'আমরা আপনার নাম, ঠিকানা, জন্ম তারিখ, NID নম্বর, মোবাইল নম্বর ইত্যাদি তথ্য সনদ আবেদন ও সেবা প্রদানের উদ্দেশ্যে সংগ্রহ করি।' },
        { heading: 'তথ্য ব্যবহার', text: 'সংগৃহীত তথ্য শুধুমাত্র সনদ প্রদান, যাচাইকরণ, ট্যাক্স সংক্রান্ত কার্যক্রম এবং আইনি প্রয়োজনে ব্যবহৃত হবে।' },
        { heading: 'তথ্য সুরক্ষা', text: 'আমরা আপনার তথ্য সুরক্ষিত সার্ভারে সংরক্ষণ করি এবং অননুমোদিত প্রবেশ থেকে রক্ষা করতে শক্তিশালী এনক্রিপশন ব্যবহার করি।' },
        { heading: 'তৃতীয় পক্ষে শেয়ারিং', text: 'আপনার ব্যক্তিগত তথ্য আমরা কোনো তৃতীয় পক্ষকে বিক্রি বা শেয়ার করি না, তবে সরকারি সংস্থার আইনি দাবিতে তথ্য প্রদান করা যেতে পারে।' }
      ]
    },
    terms: {
      title: 'ব্যবহারের শর্তাবলী',
      updated: 'সর্বশেষ হালনাগাদ: জানুয়ারি ২০২৫',
      sections: [
        { heading: 'সেবার বিবরণ', text: 'সনদ প্ল্যাটফর্মটি ইউনিয়ন পরিষদের সনদপত্র প্রদান, হোল্ডিং ট্যাক্স সংগ্রহ ও অন্যান্য সেবা প্রদানের জন্য তৈরি।' },
        { heading: 'ব্যবহারকারীর দায়িত্ব', text: 'আবেদনকারীকে সঠিক তথ্য প্রদান করতে হবে। ভুল তথ্য প্রদানের ক্ষেত্রে আবেদন বাতিল হতে পারে এবং আইনি ব্যবস্থা নেওয়া যেতে পারে।' },
        { heading: 'ফি ও পেমেন্ট', text: 'সনদ প্রদানের জন্য নির্ধারিত সরকারি ফি প্রযোজ্য। অনলাইন পেমেন্টের ক্ষেত্রে পেমেন্ট গেটওয়ের শর্তাবলী প্রযোজ্য হবে।' },
        { heading: 'সেবার পরিবর্তন', text: 'আমরা যেকোনো সময় সেবার শর্তাবলী পরিবর্তন করার অধিকার রাখি। পরিবর্তনের ক্ষেত্রে ওয়েবসাইটে নোটিফিকেশন দেওয়া হবে।' }
      ]
    }
  };

  var d = content[type];
  if (!d) return;

  var html = '<button class="legal-cl" onclick="closeLegalPage()"><i class="fas fa-times"></i></button>';
  html += '<h2>' + d.title + '</h2>';
  html += '<p class="legal-upd">' + d.updated + '</p>';
  d.sections.forEach(function(s) {
    html += '<h3>' + s.heading + '</h3>';
    html += '<p>' + s.text + '</p>';
  });
  md.innerHTML = html;
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLegalPage() {
  var ov = document.getElementById('legalOverlay');
  if (ov) {
    ov.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var legalOv = document.getElementById('legalOverlay');
  if (legalOv) {
    legalOv.addEventListener('click', function(e) {
      if (e.target === legalOv) closeLegalPage();
    });
  }
});

/* ========== জুম ট্র্যাক অ্যানিমেশন ========== */
var zoomSteps = document.querySelectorAll('.zoom-step');
var zoomConnectors = document.querySelectorAll('.zoom-connector');
var zoomIndex = 0;
var zoomInterval = null;

function activateZoomStep(index) {
  zoomSteps.forEach(function(s) { s.classList.remove('zoom-active'); });
  zoomConnectors.forEach(function(c) { c.classList.remove('filled'); });
  zoomIndex = ((index % zoomSteps.length) + zoomSteps.length) % zoomSteps.length;
  zoomSteps[zoomIndex].classList.add('zoom-active');
  /* আগের কানেক্টরগুলো ভরাও */
  for (var i = 0; i < zoomIndex && i < zoomConnectors.length; i++) {
    zoomConnectors[i].classList.add('filled');
  }
}

function startZoomCycle() {
  zoomInterval = setInterval(function() {
    activateZoomStep(zoomIndex + 1);
  }, 2500);
}

if (zoomSteps.length > 0) {
  activateZoomStep(0);
  startZoomCycle();
}

/* ========== স্ট্যাটস কাউন্টার অ্যানিমেশন ========== */
var statsCounted = false;

function animateCounters() {
  if (statsCounted) return;
  var nums = document.querySelectorAll('.st-num');
  if (nums.length === 0) return;

  var rect = nums[0].getBoundingClientRect();
  if (rect.top > window.innerHeight || rect.bottom < 0) return;

  statsCounted = true;
  nums.forEach(function(el) {
    var target = parseInt(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var current = 0;
    var step = Math.max(1, Math.floor(target / 60));
    var timer = setInterval(function() {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString('bn-BD') + suffix;
    }, 25);
  });
}

/* ========== রিভিল অ্যানিমেশন (IntersectionObserver) ========== */
function revealElements() {
  var elements = document.querySelectorAll('.rv:not(.vis)');
  elements.forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('vis');
    }
  });
  animateCounters();
}

/* পেজ লোডে রিভিল চেক */
document.addEventListener('DOMContentLoaded', function() {
  revealElements();
});

/* ========== নেভ অ্যাক্টিভ লিংক ========== */
var sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', function() {
  var scrollPos = window.pageYOffset + 150;
  sections.forEach(function(sec) {
    var top = sec.offsetTop;
    var height = sec.offsetHeight;
    var id = sec.getAttribute('id');
    var link = document.querySelector('nav a[href="#' + id + '"]');
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('nav a').forEach(function(a) { a.classList.remove('active'); });
        link.classList.add('active');
      }
    }
  });
});

/* ========== কন্টাক্ট ফর্ম সাবমিট ========== */
document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var origText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> প্রেরণ হচ্ছে...';
      btn.disabled = true;
      setTimeout(function() {
        btn.innerHTML = '<i class="fas fa-check"></i> প্রেরণ হয়েছে';
        btn.style.background = '#06d6a0';
        setTimeout(function() {
          btn.innerHTML = origText;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 2000);
      }, 1500);
    });
  }
});

/* ========== কিবোর্ড শর্টকাট ========== */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeServiceModal();
    closeContactPage();
    closeLegalPage();
  }
});
